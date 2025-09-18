/*
 * This file is part of Cockpit.
 *
 * Copyright (C) 2017 Red Hat, Inc.
 *
 * Cockpit is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation; either version 2.1 of the License, or
 * (at your option) any later version.
 *
 * Cockpit is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Cockpit; If not, see <http://www.gnu.org/licenses/>.
 */

import React, { useEffect, useState, useRef } from 'react';
import { Alert } from "@patternfly/react-core/dist/esm/components/Alert/index.js";
import { Card, CardBody, CardTitle } from "@patternfly/react-core/dist/esm/components/Card/index.js";
import { Form, FormGroup } from "@patternfly/react-core/dist/esm/components/Form/index.js";
import { Select } from "@patternfly/react-core/dist/esm/components/Select/Select.js";
import { SelectList } from "@patternfly/react-core/dist/esm/components/Select/SelectList.js";
import { SelectOption } from "@patternfly/react-core/dist/esm/components/Select/SelectOption.js";
import { Spinner } from "@patternfly/react-core/dist/esm/components/Spinner/index.js";
import { MenuToggle } from "@patternfly/react-core/dist/esm/components/MenuToggle/index.js";
import { Button } from "@patternfly/react-core/dist/esm/components/Button/index.js";
import { Grid, GridItem } from "@patternfly/react-core/dist/esm/layouts/Grid/index.js";
import { TextArea } from "@patternfly/react-core/dist/esm/components/TextArea/index.js";
import { InputGroup } from "@patternfly/react-core/dist/esm/components/InputGroup/index.js";
import { InputGroupItem } from "@patternfly/react-core/dist/esm/components/InputGroup/index.js";
import { ClipboardCopy } from "@patternfly/react-core/dist/esm/components/ClipboardCopy/index.js";
import { Switch } from "@patternfly/react-core/dist/esm/components/Switch/index.js";

import cockpit from 'cockpit';

const _ = cockpit.gettext;

interface OllamaModel {
    name: string;
    modified_at: string;
    size: number;
    digest: string;
}

export const Application = () => {
    const [hostname, setHostname] = useState(_("Unknown"));
    const [models, setModels] = useState<OllamaModel[]>([]);
    const [loadingModels, setLoadingModels] = useState(true);
    const [ollamaError, setOllamaError] = useState<string | null>(null);
    const [generationError, setGenerationError] = useState<string | null>(null);
    const [isModelSelectOpen, setModelSelectOpen] = useState(false);
    const [selectedModel, setSelectedModel] = useState<string | null>(null);
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [currentRequest, setCurrentRequest] = useState<any>(null);
    const [codeBlockProcessing, setCodeBlockProcessing] = useState(false);
    const [expandedBlocks, setExpandedBlocks] = useState<{[key: number]: boolean}>({});
    const [hoveredBlock, setHoveredBlock] = useState<number | null>(null);
    const responseRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (responseRef.current) {
            responseRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [response]);

    useEffect(() => {
        cockpit.script("hostname")
            .then(content => setHostname(content.trim()))
            .catch(error => console.error("Failed to fetch hostname:", error));

        // The cockpit.http client is created for localhost by default on port 11434
        const ollama = cockpit.http(11434);

        ollama.get("/api/tags")
            .then(response => {
                const data = JSON.parse(response);
                setModels(data.models || []);
            })
            .catch(err => {
                console.error("Failed to fetch Ollama models:", err);
                if (err.status === 0) {
                    setOllamaError(_("Failed to connect to Ollama service. Is it running on localhost:11434?"));
                } else {
                    setOllamaError(`${_("Error fetching models:")} ${err.message}`);
                }
            })
            .finally(() => {
                setLoadingModels(false);
            });
    }, []);

    const onModelSelect = (event: React.MouseEvent | React.ChangeEvent, value: string) => {
        setSelectedModel(value);
        setModelSelectOpen(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            if (isGenerating) {
                handleStop();
            } else {
                handleSend();
            }
        }
    };

    const clearPrompt = () => {
        setPrompt('');
    };

    const renderResponse = (text: string) => {
        const parts = text.split(/(```[\s\S]*?```)/g);
        return parts.map((part, index) => {
            if (part.startsWith('```') && part.endsWith('```')) {
                const content = part.slice(3, -3);
                const lines = content.split('\n');
                const language = lines[0].trim();
                const code = lines.slice(1).join('\n');
                const isExpanded = expandedBlocks[index] ?? true;
                return (
                    <div key={index}>
                        <div style={{ border: '1px solid var(--pf-v6-global--BorderColor--100)', borderRadius: '3px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', padding: '0.5rem', backgroundColor: 'var(--pf-v6-global--BackgroundColor--200)', borderBottom: '1px solid var(--pf-v6-global--BorderColor--100)' }}>
                                <span style={{ marginRight: 'auto' }}>{language}</span>
                                <Button 
                                    variant="plain" 
                                    onMouseEnter={() => setHoveredBlock(index)}
                                    onMouseLeave={() => setHoveredBlock(null)}
                                    onClick={() => navigator.clipboard.writeText(code)}
                                >
                                    {_("Copy")}
                                </Button>
                            </div>
                            <div style={{ 
                                padding: '0.5rem', 
backgroundColor: hoveredBlock === index ? 'rgba(0, 123, 255, 0.3)' : 'rgba(128, 128, 128, 0.2)', 
                                fontFamily: 'monospace', 
                                whiteSpace: 'pre-wrap', 
                                overflow: 'auto',
                                transition: 'background-color 0.2s'
                            }}>
                                {code}
                            </div>
                        </div>
                    </div>
                );
            }
            return <span key={index} style={{ whiteSpace: 'pre-wrap' }}>{part}</span>;
        });
    };

    const handleStop = () => {
        if (currentRequest) {
            currentRequest.close();
            setCurrentRequest(null);
            setIsGenerating(false);
        }
    };

    const handleSend = () => {
        if (!selectedModel || !prompt.trim() || isGenerating) {
            return;
        }

        setIsGenerating(true);
        setResponse('');
        setGenerationError(null);

        const payload = {
            model: selectedModel,
            prompt: prompt,
            stream: true,
        };

        const ollama = cockpit.http(11434);
        const promise = ollama.request({
            method: "POST",
            path: "/api/generate",
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json" }
        });

        setCurrentRequest(promise);

        promise.stream(chunk => {
            try {
                // Ollama streams JSON objects separated by newlines
                const lines = chunk.split('\n').filter(line => line.trim() !== '');
                for (const line of lines) {
                    const data = JSON.parse(line);
                    if (data.response) {
                        setResponse(prev => prev + data.response);
                    }
                    if (data.error) {
                        setGenerationError(data.error);
                        promise.close();
                    }
                }
            } catch (e) {
                console.error("Failed to parse stream chunk:", e, "Chunk:", chunk);
                setGenerationError(_("An error occurred while processing the response stream."));
                promise.close();
            }
        });

        promise.catch(err => {
            console.error("Failed to send prompt to Ollama:", err);
            if (err.status === 0) {
                setGenerationError(_("Failed to connect to Ollama service. Is it running on localhost:11434?"));
            } else {
                setGenerationError(`${_("Error sending prompt:")} ${err.message}`);
            }
        });

        promise.finally(() => {
            setIsGenerating(false);
            setCurrentRequest(null);
        });
    };

    const toggle = (toggleRef: React.Ref<any>) => (
        <MenuToggle
            ref={toggleRef}
            onClick={() => setModelSelectOpen(!isModelSelectOpen)}
            isExpanded={isModelSelectOpen}
            style={{ width: '100%' }}
        >
            {selectedModel || _("Select a model")}
        </MenuToggle>
    );

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem' }}>
            <Card>
                <CardTitle>Ollama</CardTitle>
                <CardBody>
                    <Alert variant="info" isInline title={cockpit.format(_("Running on host $0"), hostname)} />
                </CardBody>
            </Card>
            <Card>
                <CardTitle>{_("Available Models")}</CardTitle>
                <CardBody>
                    {loadingModels && <Spinner aria-label={_("Loading models")} />}
                    {ollamaError && <Alert variant="danger" isInline title={ollamaError} />}
                    {!loadingModels && !ollamaError &&
                        <Form>
                            <FormGroup label={_("Model")} fieldId="model-select">
                                {models.length > 0 ? (
                                    <Select
                                        id="model-select"
                                        isOpen={isModelSelectOpen}
                                        selected={selectedModel}
                                        onSelect={onModelSelect}
                                        onOpenChange={(isOpen) => setModelSelectOpen(isOpen)}
                                        toggle={toggle}
                                    >
                                        <SelectList>
                                            {models.map(model => <SelectOption key={model.digest} value={model.name}>{model.name}</SelectOption>)}
                                        </SelectList>
                                    </Select>
                                ) : (
                                    <Alert variant="info" isInline title={_("No models found.")} />
                                )}
                            </FormGroup>
                        </Form>}
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <Grid hasGutter>
                        <GridItem span={11}>
                            <InputGroup>
                                <InputGroupItem isFill>
                                    <TextArea
                                        onKeyDown={handleKeyDown}
                                        value={prompt}
                                        onChange={(_event, value) => setPrompt(value)}
                                        rows={3}
                                        aria-label={_("Prompt input")}
                                        placeholder={_("Enter your prompt here...")}
                                        isDisabled={!selectedModel || isGenerating}
                                    />
                                </InputGroupItem>
                                {prompt && (
                                    <InputGroupItem>
                                        <Button
                                            variant="plain"
                                            onClick={clearPrompt}
                                            aria-label={_("Clear prompt")}
                                            style={{ position: 'absolute', right: '8px', top: '8px', zIndex: 1 }}
                                        >
                                            ×
                                        </Button>
                                    </InputGroupItem>
                                )}
                            </InputGroup>
                        </GridItem>
                        <GridItem span={1} style={{ display: 'flex', alignItems: 'flex-end' }}>
                            <Button
                                variant={isGenerating ? "secondary" : "primary"}
                                onClick={isGenerating ? handleStop : handleSend}
                                isDisabled={!selectedModel || (!isGenerating && !prompt.trim())}
                            >
                                {isGenerating ? _("Stop") : _("Send")}
                            </Button>
                        </GridItem>
                    </Grid>
                </CardBody>
            </Card>
            <Card style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <CardTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {_("Response")}
                    <Switch
                        id="code-block-toggle"
                        label={_("Process code blocks")}
                        isChecked={codeBlockProcessing}
                        onChange={(_event, checked) => setCodeBlockProcessing(checked)}
                    />
                </CardTitle>
                <CardBody style={{ flex: 1, overflow: 'auto' }}>
                    {isGenerating && !response && <Spinner aria-label={_("Generating response")} />}
                    {generationError && <Alert variant="danger" isInline title={generationError} />}
                    {response && <div ref={responseRef} style={{ fontFamily: 'monospace', whiteSpace: codeBlockProcessing ? 'normal' : 'pre-wrap' }}>{codeBlockProcessing ? renderResponse(response) : response}</div>}
                    {!isGenerating && !response && !generationError && <p>{_("The response from Ollama will appear here.")}</p>}
                </CardBody>
            </Card>
        </div>
    );
};
