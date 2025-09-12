import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/TextArea";
import { Label } from "@/components/ui/label";
import ErrorInputMessage from "@/components/ui/ErrorInputMessage";
import { Loader2Icon, Wand2 } from "lucide-react";

export default function PromptInput({ error='', loading=false, onSubmitPrompt, promptValue, onPromptChange }){
  return (
    <>
    <div className="flex flex-col space-y-4">
      <Textarea
        aria-invalid={error ? true : false}
        className='m-0'
        placeholder="Describe what you'd like to achieve with your code."
        value={promptValue}
        onChange={(e) => onPromptChange(e.target.value)}
      />
      {error && <ErrorInputMessage message={error} className="mb-0! mt-1!" />}
    </div>
    <Button disabled={loading} className="mt-4 cursor-pointer" onClick={()=> onSubmitPrompt(promptValue)}>
      <Wand2 className="w-4 h-4 mr-0!" />
      Transform 
      {loading && <Loader2Icon className="animate-spin ml-2" />}
    </Button>
    </>
    
  )
}