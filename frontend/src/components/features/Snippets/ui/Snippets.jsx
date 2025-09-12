import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/Switch";
import { Button } from "@/components/ui/Button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { Loader2Icon, Edit, Trash2, Copy, Check, AlertTriangle, Plus } from "lucide-react";

export default function Snippets() {
  const navigate = useNavigate();
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [openDeletePopover, setOpenDeletePopover] = useState(null);

  useEffect(() => {
    fetchSnippets();
  }, []);

  const fetchSnippets = async () => {
    try {
      setLoading(true);
      const { ajax_url, nonce } = window.codesnip_;

      const formData = new URLSearchParams();
      formData.append("action", "codesnip_get_all");
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
        setError(data.error);
      } else if (data.snippets) {
        setSnippets(data.snippets);
      }
    } catch (err) {
      setError("Failed to fetch snippets");
      console.error("Error fetching snippets:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async (snippetId, currentStatus) => {
    try {
      const { ajax_url, nonce } = window.codesnip_;

      const formData = new URLSearchParams();
      formData.append("action", "codesnip_toggle_status");
      formData.append("snippet_id", snippetId);
      formData.append("status", currentStatus ? "0" : "1");
      formData.append("_ajax_nonce", nonce);

      const res = await fetch(ajax_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      const { data } = await res.json();
      
      if (!data.error) {
        setSnippets(prev => prev.map(snippet => 
          snippet.id === snippetId 
            ? { ...snippet, status: currentStatus ? 0 : 1 }
            : snippet
        ));
      }
    } catch (err) {
      console.error("Error toggling status:", err);
    }
  };

  const handleDelete = async (snippetId) => {
    setOpenDeletePopover(null);
    try {
      const { ajax_url, nonce } = window.codesnip_;

      const formData = new URLSearchParams();
      formData.append("action", "codesnip_delete");
      formData.append("snippet_id", snippetId);
      formData.append("_ajax_nonce", nonce);

      const res = await fetch(ajax_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      const { data } = await res.json();
      
      if (!data.error) {
        // Remove the snippet from local state
        setSnippets(prev => prev.filter(snippet => snippet.id !== snippetId));
      }
    } catch (err) {
      console.error("Error deleting snippet:", err);
    }
  };

  const handleCopyShortcode = async (snippetId) => {
    const shortcode = `[codesnip id="${snippetId}"]`;
    
    try {
      await navigator.clipboard.writeText(shortcode);
      setCopiedId(snippetId);
    } catch (err) {
      // Fallback: use deprecated execCommand (still works in most browsers)
      const textArea = document.createElement("textarea");
      textArea.value = shortcode;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopiedId(snippetId);
      } catch (fallbackErr) {
        console.error('Copy failed:', fallbackErr);
      }
      document.body.removeChild(textArea);
    }
    
    // Reset copied state after 2 seconds
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2Icon className="animate-spin h-8 w-8 text-blue-500" />
        <span className="ml-2 text-gray-600">Loading snippets...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={fetchSnippets}>Retry</Button>
      </div>
    );
  }

  if (snippets.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">No snippets found</p>
        <Button className="cursor-pointer" onClick={() => navigate('/add-new')}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Snippet
        </Button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 text-sm font-semibold leading-normal">
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Title</th>
            <th className="py-3 px-6 text-left">ShortCode</th>
            <th className="py-3 px-6 text-left">Created At</th>
            <th className="py-3 px-6 text-left">Actions</th>
            <th className="py-3 px-6 text-left">Status</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {snippets.map((snippet) => (
            <tr key={snippet.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left">{snippet.id}</td>
              <td className="py-3 px-6 text-left">{snippet.title}</td>
              <td className="py-3 px-6 text-left">
                <div className="flex items-center space-x-2">
                  <div className="max-w-xs truncate" title={snippet.snippet}>
                    {`[codesnip id="${snippet.id}"]`}
                  </div>
                  <button
                    className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                    onClick={() => handleCopyShortcode(snippet.id)}
                    title="Copy shortcode"
                  >
                    {copiedId === snippet.id ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-500 hover:text-blue-500" />
                    )}
                  </button>
                </div>
              </td>
              <td className="py-3 px-6 text-left">
                {new Date(snippet.created_at).toLocaleDateString()}
              </td>
              <td className="py-3 px-6 text-left">
                <div className="flex item-center">
                  <button 
                    className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110 cursor-pointer"
                    onClick={() => navigate(`/edit/${snippet.id}`)}
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <Popover open={openDeletePopover === snippet.id} onOpenChange={(open) => setOpenDeletePopover(open ? snippet.id : null)}>
                    <PopoverTrigger asChild>
                      <button 
                        className="w-4 mr-2 transform hover:text-red-500 hover:scale-110 cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Delete Snippet</h4>
                          <p className="text-sm text-gray-600">Are you sure you want to delete this snippet?</p>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setOpenDeletePopover(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() =>  handleDelete(snippet.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </td>
              <td className="py-3 px-6 text-left">
                <Switch 
                  className="cursor-pointer"
                  checked={snippet.status === 1}
                  onCheckedChange={() => handleStatusToggle(snippet.id, snippet.status === 1)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
