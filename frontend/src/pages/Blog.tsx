import { useRef, useState } from "react";
import { BlogComponent } from "../components/BlogComponent";
import { Editor } from "@tinymce/tinymce-react"; // Adjust based on your editor package
import axios from "axios";

export const Blog = () => {
    const editorRef = useRef<any>(null);
    const [textValue, setTextValue] = useState<string>("");
    const [isSubmitting,setIsSubmitting] = useState(false);
    const [content,setContent] = useState({
        title: "",
        author: "",
        metatitle: "",
        metadescription: "",
        metakeywords: "",
        blogURL: "",
        htmlContent: "",
        published: false
    });
    const [author,setAuthor] = useState("");

    const log = () => {
        if (editorRef.current) {
            const htmlcontent = editorRef.current.getContent();
            setTextValue(htmlcontent);
            setContent((prevData)=>({...prevData,htmlContent: htmlcontent}));
            

        }
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    
        const {name,value} = e.target;

        setContent((prevData)=>({...prevData,[name]:value}));
    }
    const handlePublish = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        if(!content.author || !content.blogURL || !content.metadescription || !content.metakeywords || !content.metatitle || !content.htmlContent || !content.title){
            alert("Please fill all the fields");
            setIsSubmitting(false);
            return
        }
        setContent((prevData)=>({...prevData, published: true}));
     
        try{
            const response = await axios.post('http://localhost:3000/api/v1/blog/Admin/create/blog',{
                content
            },{
             headers: {'authorization': `${localStorage.getItem('token')}`}
            });
            alert("Draft saved successfully");

        } catch(error){
          console.error("An error occurred while publishing the blog", error);
          alert("An error occurred while publishing the blog");
        }finally{
            setIsSubmitting(false);
            window.location.reload();
        }
    }
    const handleDraft = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        if(!content.author || !content.blogURL || !content.metadescription || !content.metakeywords || !content.metatitle || !content.htmlContent || !content.title){
            alert("Please fill all the fields");
            setIsSubmitting(false);
            return
        }
        setContent((prevData)=>({...prevData,published:false}))
        try{
            const response = await axios.post('http://localhost:3000/api/v1/blog/Admin/create/blog',{
                content
            },{
                headers: {'authorization': `${localStorage.getItem('token')}`}
            });
            alert("Blog published successfully");
        } catch(error){
            console.error("An error occurred while publishing the blog",error);
            alert("An error occurred while saving the draft");
        } finally{
            setIsSubmitting(false);
        }
    }
    return (
        <div>
            
            <form className='w-full'>
                <div className="w-full flex justify-center mt-5">
                <input type="text" placeholder="TITLE" name="title" value={content.title} onChange={handleOnChange}  className="w-3/5 text-center py-2 px-1 border-b-2"></input>
                </div>
                <div className="w-full flex justify-end">
                    <input type="text" placeholder="By: author name" name="author" value={content.author} onChange={handleOnChange} className="py-2 px-1 border-b-2 mr-10 text-center"></input>
                </div>
                <BlogComponent
                    onInit={(_evt: Event, editor: Editor) => editorRef.current = editor}
                    initialValue='<p>This is my first writing.</p>'
                    init={{
                        height: 0.5 * window.innerHeight,
                        width: 0.75 * window.innerWidth,
                        menubar: false,
                        plugins: [
                            'advlist', 'anchor', 'autolink', 'link', 'lists',
                            'searchreplace', 'table', 'wordcount', 'code', 'directionality', 'media', 'preview', 'image', 'emoticons'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic underline forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'link code directionality media table preview image emoticons' + 'link',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    }}
                    onChange={() => log()}
                />
                <div className="w-full  flex justify-center">
                    <div className="border-2 mx-2 my-2 p-5 rounded-md shadow-lg">
                    <div className="my-2 w-full  flex">
                      <div>
                        <h1 className="font-bold ml-2">Meta Title</h1>
                      <input type="text" placeholder="Meta Title" name="metatitle" onChange={handleOnChange} className="mx-2 py-2 px-1 rounded-lg mt-4 border-2 " value={content.metatitle}></input>
                      </div>
                     <div>
                        <h1 className="font-bold ml-2">Meta Description</h1>
                     <textarea placeholder="Meta description" name="metadescription" value={content.metadescription} onChange={handleOnChange} className="mx-2  py-2 px-1 rounded-lg mt-2 border-2"></textarea>
                     </div>
                    
                    </div>
                    <div className="w-full my-2">
                    <h1 className="font-bold ml-2">Meta Keywords</h1>
                    <div>
                    <input placeholder="Meta keywords" name="metakeywords" value={content.metakeywords} onChange={handleOnChange} className="mx-2  py-2 px-1 rounded-lg mt-2 border-2 w-full"></input>
                    </div>
                     </div>
                    <div>
                     <h1 className="font-bold ml-2">Blog URL: domainname/blogs/</h1>
                     <input placeholder="Enter what need to be displayed after /blogs/" name="blogURL" value={content.blogURL} onChange={handleOnChange} className="mx-2  py-2 px-1 rounded-lg mt-2 border-2 w-full"></input>
                    </div>
                    </div>
                    
                </div>
                <div className=" flex-col flex justify-content">
                    <div className="flex justify-center gap-5">
                    <button onClick={handlePublish} disabled={isSubmitting} className="bg-black text-white px-2 py-1 rounded-lg flex justify-center">Publish</button>
                    <button onClick={handleDraft} disabled={isSubmitting} className="bg-black text-white px-2 py-1 rounded-lg flex justify-center">Save Draft</button>
                    </div>
                    <div className="flex justify-center mt-10">
                    <div className="w-1/2 text-center">
                    <span className="text-red-600">Warning !</span> To ensure your progress is saved, please remember to click the Save Draft button before navigating away from this page. If you do not click Save Draft, any unsaved changes will be lost and cannot be recovered. Clicking the Publish button will post your blog directly. Once published, you can view your blog in the Admin Panel.
                    </div>
             
                    </div>
               
                </div>
                </form>
        </div>
    );
};
