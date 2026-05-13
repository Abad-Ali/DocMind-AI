import React, { useEffect, useRef, useState } from 'react'
import AIOrb from './AiAnimatedLogo'
import { SendIcon } from 'lucide-react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from './ui/button'
import { motion } from 'framer-motion'

const AiBar = ({ pdfId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input,setInput] = useState({question:""});

  const {user} = useSelector(store=>store.auth);

  const summaryHandle = async () => {
    try {
      setLoading(true);

      // Adding user message
      setMessages(prev => [...prev, {role: "user", content: "Give me summary"}]);

      const res = await axios.post(`http://localhost:8000/api/v1/pdf/${pdfId}/summary`,{},{ 
          withCredentials: true 
        }
      );

      if (res.data.success) {
        setMessages(prev => [...prev, {role: "ai", content: res.data.aiSummary}]);
      }

    } catch (error) {
      // console.log(error);
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        setMessages(prev => [
          ...prev,
          { role: "ai", content: errorMessage }
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  const QAHandle = async () => {
    try {
      setLoading(true);

      // Adding user message
      setMessages(prev => [...prev, { role: "user", content: "Generate questions" }]);

      const res = await axios.post(`http://localhost:8000/api/v1/pdf/${pdfId}/questions`,{},{
          withCredentials: true 
        }
      );

      if (res.data.success) {
        const formattedQuestions = res.data.aiQuestions.map(q => `Q: ${q.question}\nA: ${q.answer}`).join("\n\n");

        setMessages(prev => [...prev, {role: "ai", content: formattedQuestions}]);
      }

    } catch (error) {
      // console.log(error);
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        setMessages(prev => [
          ...prev,
          { role: "ai", content: errorMessage }
        ]);
      }

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.name) {
      setMessages([
        {
          role: "ai",
          content: `Hi, ${user.username} 👋\nHow can I help you with your document today?`
        }
      ]);
    }
  }, [user]);

  const handleChange = (e)=>{
    setInput({...input, [e.target.name]:e.target.value});
  };

  const chatHandle = async(e)=>{
    e.preventDefault();
    console.log(input);
    setLoading(true);
    setInput({question:""});
    try {
      // Adding user message
      setMessages(prev => [...prev, { role: "user", content: `${input.question}` }]);

      const res = await axios.post(`http://localhost:8000/api/v1/pdf/${pdfId}/chat`, input ,{
        headers:{
          "Content-Type":'application/json'
        },
        withCredentials:true
      });

      if(res.data.success){
        setMessages(prev => [...prev, {role: "ai", content: res.data.aiResponse}]);
        setInput({question:""});
      }
    } catch (error) {
      let errorMessage = "Something went wrong. Please try again.";

      if (error.response) {
        // Backend responded with error status
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.request) {
        // No response (network issue)
        errorMessage = "Network error. Please check your internet.";
      }

      setMessages(prev => [
        ...prev,
        { role: "ai", content: errorMessage }
      ]);

    }finally{
      setLoading(false);
    }
  }

  const containerRef = useRef(null);
  // Auto-scroll when new messages arrive
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <motion.div initial={{ opacity: 0, x: 70 }} viewport={{ once: true }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: "easeInOut" }} className='hidden absolute right-0 h-screen w-[25vw] border-l-2 border-slate-500 py-1 text-white lg:flex flex-col overflow-hidden bg-black/10 backdrop-blur-xs backdrop-brightness-200'>

      <div className='flex items-center gap-1'>
        <AIOrb />
        <div>
          <h1 className="text-xl font-bold font-serif">
            DocMind <span className="text-blue-700">AI</span>
          </h1>
          <span className="text-xs text-slate-500">
            AI-powered document intelligence
          </span>
        </div>
      </div>

      <hr className="border-slate-500 mx-3" />

      <div ref={containerRef} className='flex-1 mx-3 my-2 overflow-y-auto space-y-4 py-2 scroll-hide scrollable pb-15'>

        <motion.div initial={{ opacity: 0, y: 20 }} viewport={{ once: true }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeInOut" }} className='absolute bottom-10 flex justify-start items-center w-full gap-3 z-10'>
          <Button disabled={loading} onClick={summaryHandle} className="px-5 py-0.5 rounded-4xl text-sm cursor-pointer border-2 border-blue-700 hover:scale-105 duration-300">
            Summary
          </Button>
        
          <Button disabled={loading} onClick={QAHandle} className="px-5 py-0.5 rounded-4xl text-sm cursor-pointer border-2 border-green-500 hover:scale-105 duration-300">
            Questions
          </Button>
        </motion.div>
      
        {messages.map((msg, index) => (
          <div key={index}className={`flex items-end gap-1 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            
            {/* AI Avatar */}
            {msg.role === "ai" && (
              <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", }}>
                <AIOrb size={55} />
              </motion.div>
            )}
      
            {/* Message Bubble */}
            <motion.div initial={{ opacity: 0, y: 15, scale: 0.95, x: msg.role === "user" ? 30 : -30, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, scale: 1, x: 0, filter: "blur(0px)" }} transition={{ type: "spring", stiffness: 140, damping: 16 }} whileHover={{ scale: 1.01 }}  className={`max-w-[75%] px-4 py-2 rounded-3xl whitespace-pre-line text-sm ${msg.role === "user" ? "bg-blue-600 text-white rounded-br-xs" : "bg-[#0f172b] text-white rounded-bl-xs"}`}>
              {msg.content}
            </motion.div>
      
            {/* User Avatar */}
            {msg.role === "user" && (
              <Avatar className="w-7.7 h-7.7 mr-2">
                <AvatarImage src={user.profilePicture} alt="Profile_pic"/>
                <AvatarFallback>DI</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      
        {loading && (
          <div className="flex items-center gap-2">
            <div>
              <AIOrb size={55} />
            </div>
            <div className="bg-[#0f172b] px-4 py-2 rounded-2xl text-sm">
              AI is thinking...
            </div>
          </div>
        )}
      
      </div>

      <motion.form initial={{ opacity: 0, y: 30 }} viewport={{ once: true }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeInOut" }} onSubmit={chatHandle} className='flex items-center mx-2 border p-1 border-slate-500 rounded-lg'>
        <input name='question' value={input.question} onChange={handleChange} className='outline-none w-full px-1 py-1 bg-transparent' placeholder="Ask your question here..." required/>
        <button disabled={loading} type='submit'>
          <SendIcon size={20} className='hover:text-blue-700 cursor-pointer mr-2'/>
        </button>
      </motion.form>

    </motion.div>
  )
}

export default AiBar