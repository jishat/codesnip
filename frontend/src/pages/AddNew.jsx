import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "@/components/features/TopBar";
import CodeEditor from "@/components/ui/CodeEditor";
import { TypographyH3 } from "@/components/ui/TypographyH3";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/Resizable";
import { TypographyH4 } from "@/components/ui/TypographyH4";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Loader2Icon, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/Input";
import ErrorInputMessage from "@/components/ui/ErrorInputMessage";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import PromptInput from "@/components/features/AiPrompt/ui/PromptInput";
import config from "@/config/config";

export default function AddNew() {
  const navigate = useNavigate();
  const [snippet, setSnippet] = useState("");
  const [title, setTitle] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [promptValue, setPromptValue] = useState("");
  const [errors, setErrors] = useState({
    snippet: "",
    title: "",
    result: "",
    prompt: "",
  });

  const onSubmitPrompt = async (prompt) => {
    if (!prompt.trim()) {
      setErrors((prev) => {
        const d = JSON.parse(JSON.stringify(prev));
        d.prompt = "Prompt must required";
        return d;
      });
      return;
    }

    if (!snippet.trim()) {
      setErrors((prev) => {
        const d = JSON.parse(JSON.stringify(prev));
        d.prompt = "Code snippet must required";
        return d;
      });
      return;
    }

    setLoading(true);

    const formData = new URLSearchParams();
    formData.append("action", "codesnip_assist");
    formData.append("snippet", snippet);
    formData.append("prompt", prompt);
    formData.append("_ajax_nonce", config.NONCE);

    const res = await fetch(config.AJAX_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const {data} = await res.json();

    if(data.error){
      setErrors(data.error);
    }

    if(!data.error && data.data){
      setResult(data.data);
      setDialogOpen(false);
      setPromptValue("");
    }
    setLoading(false);
  };

  const saveSnippet = async ({actionFrom}) => {
    const code = actionFrom === 'ai' ? result : snippet;
    if(actionFrom === 'ai'){
      if (!result.trim())
        setErrors((prev) => {
          const d = JSON.parse(JSON.stringify(prev));
          d.result = "Code must required";
          return d;
        });
    }else{
      if (!code.trim())
        setErrors((prev) => {
          const d = JSON.parse(JSON.stringify(prev));
          d.snippet = "Code must required";
          return d;
        });
    }

    if (!title.trim())
      setErrors((prev) => {
        const d = JSON.parse(JSON.stringify(prev));
        d.title = "Title must required";
        return d;
      });

    if (!code.trim() || !title.trim()) return;

    setErrors({title: '', snippet: '', prompt: '', result: ''})
    setLoading(true);

    const formData = new URLSearchParams();
    formData.append('snippet', code);
    formData.append('title', title);
    formData.append('action', 'codesnip_save');
    formData.append('_ajax_nonce', config.NONCE);

    const res = await fetch(config.AJAX_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });
    const {data} = await res.json();
    console.log('--data', data)
    if(data?.error && data.error?.common){
      if(actionFrom === 'ai'){  
        setErrors({result: data.error.common});
      }else{
        setErrors({snippet: data.error.common});
      }
    }
    if(data?.error && data.error?.snippet){
      if(actionFrom === 'ai'){  
        setErrors({result: data.error.snippet});
      }else{
        setErrors({snippet: data.error.snippet});
      }
    }
    if(data?.error && data.error?.title){
      setErrors(data.error);
    }

    if(!data.error && data.message){
      navigate('/');
    }
    setLoading(false);
  };  

  const onChangeResult = (val) => {
    setResult(val);
  }

  return (
    <div className="codesnip-wrapper">
      <div className="codesnip-content">
        <TopBar />
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <button 
                  onClick={() => navigate('/')}
                  className="text-blue-800 hover:text-blue-800 hover:underline cursor-pointer"
                >
                  All Snippets
                </button>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Add New</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <TypographyH3 className="pb-2 mt-0!">Add New Snippet</TypographyH3>
          <div className="">
            <div className="grid w-full items-center gap-3 mb-6">
              <div>
                <Input
                  id="title"
                  isInvalid={errors?.title ? true : false}
                  placeholder="Enter title here"
                  value={title}
                  onChange={(val) => setTitle(val.target.value)}
                  className="w-full"
                  size="xl"
                />
                {errors?.title && (
                  <ErrorInputMessage message={errors.title} className="mt-1" />
                )}
              </div>
            </div>
            <ResizablePanelGroup
              direction="horizontal"
              className="max-w-full rounded-lg border md:min-w-[450px]"
            >
              <ResizablePanel defaultSize={50}>
                <TypographyH4 className="mb-4! mt-4! ml-4!">
                  Code Preview
                </TypographyH4>
                <CodeEditor value={snippet} onChange={setSnippet} className="pr-1" />
                <div className="my-4 ml-4">
                    {errors?.snippet && (
                      <ErrorInputMessage message={errors.snippet} className="mt-1 " />
                    )}
                  <div className="flex gap-2">
                    <Button
                      className="cursor-pointer"
                      onClick={() => saveSnippet({actionFrom: 'snippet'})}
                      disabled={loading}
                    >
                      Save Snippet
                      {loading && <Loader2Icon className="animate-spin" />}
                    </Button>

                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-blue-500 hover:bg-blue-600 cursor-pointer" >
                          <Sparkles />
                          AI Assistant
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>AI Assistant</DialogTitle>
                          <DialogDescription>
                            Transform your code with AI-powered optimization, Tailwind CSS conversion, and intelligent enhancement 
                          </DialogDescription>
                        </DialogHeader>
                        <div><PromptInput error={errors?.prompt || ''} loading={loading} onSubmitPrompt={onSubmitPrompt} promptValue={promptValue} onPromptChange={setPromptValue} /></div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={50}>
                <TypographyH4 className="mb-4! mt-4! ml-4!">
                  AI Result
                </TypographyH4>
                <CodeEditor
                  value={result}
                  onChange={onChangeResult}
                  placeholder="AI results"
                  className="pr-1"
                />
                {errors?.result && (
                  <ErrorInputMessage message={errors.result} className="mt-1 ml-4!" />
                )}
                <div className="my-4 ml-4">
                  <Button
                    className="cursor-pointer"
                    onClick={() => saveSnippet({actionFrom: 'ai'})}
                    disabled={loading || !result}
                  >
                    Save Result
                    {loading && <Loader2Icon className="animate-spin" />}
                  </Button>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
