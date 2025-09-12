import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { AlertCircleIcon, Loader2Icon, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/Input";
import ErrorInputMessage from "@/components/ui/ErrorInputMessage";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import PromptInput from "@/components/features/AiPrompt/ui/PromptInput";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import SuccessMessage from "@/components/ui/SuccessMessage";

export default function EditSnippet() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [snippet, setSnippet] = useState("");
  const [title, setTitle] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [promptValue, setPromptValue] = useState("");
  const [errors, setErrors] = useState({
    snippet: "",
    title: "",
    result: "",
    prompt: "",
    notFound: "",
  });
  const [successMessage, setSuccessMessage] = useState({
    snippet: "",
    result: "",
  });

  useEffect(() => {
    if (id) {
      fetchSnippet();
    }
  }, [id]);

  const fetchSnippet = async () => {
    try {
      setFetching(true);
      const { ajax_url, nonce } = window.codesnip_;

      const formData = new URLSearchParams();
      formData.append("action", "codesnip_get_by_id");
      formData.append("snippet_id", id);
      formData.append("_ajax_nonce", nonce);

      const res = await fetch(ajax_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      const { data } = await res.json();
      
      if (data.error) {
        setErrors({notFound: data.error});
      } else if (data.snippet) {
        const snippetData = data.snippet;
        setTitle(snippetData.title || "");
        setSnippet(snippetData.snippet || "");
      }
    } catch (err) {
      setErrors({common: "Failed to fetch snippet"});
      console.error("Error fetching snippet:", err);
    } finally {
      setFetching(false);
    }
  };

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
    const { ajax_url, nonce } = window.codesnip_;

    const formData = new URLSearchParams();
    formData.append("action", "codesnip_assist");
    formData.append("snippet", snippet);
    formData.append("prompt", prompt);
    formData.append("_ajax_nonce", nonce);

    const res = await fetch(ajax_url, {
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

  const updateSnippet = async ({actionFrom}) => {
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
    setSuccessMessage({snippet: '', result: ''})
    setLoading(true);
    const { ajax_url, nonce } = window.codesnip_;

    const formData = new URLSearchParams();
    formData.append('snippet', code);
    formData.append('title', title);
    formData.append('snippet_id', id);
    formData.append('action', 'codesnip_update');
    formData.append('_ajax_nonce', nonce);

    const res = await fetch(ajax_url, {
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
      if(actionFrom === 'ai'){
        setSuccessMessage({result: data.message});
      }else{
        setSuccessMessage({snippet: data.message});
      }
    }
    setLoading(false);
  };  

  const onChangeResult = (val) => {
    setResult(val);
  }

  if (fetching) {
    return (
      <div className="min-h-screen text-gray-800">
        <TopBar />
        <div className="flex justify-center items-center py-8">
          <Loader2Icon className="animate-spin h-8 w-8 text-blue-500" />
          <span className="ml-2 text-gray-600">Loading snippet...</span>
        </div>
      </div>
    );
  }

  if(errors?.notFound){
    return (
      <div className="min-h-screen text-gray-800 p-6">
      <TopBar />
      <div className="flex justify-center items-center py-8">
        <Alert variant="destructive" className="w-md">
          <AlertCircleIcon />
          <AlertTitle>{errors?.notFound}</AlertTitle>
        </Alert>
      </div>
    </div>
    );
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
                <BreadcrumbPage>Edit Snippet</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <TypographyH3 className="pb-2 mt-0!">Edit Snippet</TypographyH3>
          <div className="grid w-full items-center gap-3 mb-6">
            <Input
              id="title"
              isInvalid={errors?.title ? true : false}
              placeholder="Enter title here"
              value={title}
              onChange={(val) => setTitle(val.target.value)}
              className="w-full"
            />
            {errors?.title && (
              <ErrorInputMessage message={errors.title} className="mt-1" />
            )}

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
                  {successMessage?.snippet && <SuccessMessage message={successMessage?.snippet} className="mt-1 " />}
                <div className="flex gap-2">
                  <Button
                    className="cursor-pointer"
                    onClick={() => updateSnippet({actionFrom: 'snippet'})}
                    disabled={loading}
                  >
                    Update Snippet
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
              {successMessage?.result && <SuccessMessage message={successMessage?.result} className="mt-1 ml-4!" />}
              <div className="my-4 ml-4">
                <Button
                  className="cursor-pointer"
                  onClick={() => updateSnippet({actionFrom: 'ai'})}
                  disabled={loading || !result}
                >
                  Update Result
                  {loading && <Loader2Icon className="animate-spin" />}
                </Button>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
}
