// import { useState } from 'react';
// import { DeepChat } from 'deep-chat-react';
// import './ChatBot.scss';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faComment } from '@fortawesome/free-solid-svg-icons'; // specific icon

// export const ChatBot = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       {isOpen && (
//         <div className="chatbox-container">
//           <DeepChat
//             demo={false}
//             style={{ width: '100%', height: '100%', borderRadius: '12px' }}
//             textInput={{ placeholder: { text: 'Ask something about the app...' } }}
//             connect={{
//               handler: async (body, signals) => {
//                 const userMessage = body.messages?.[0]?.text || '';

//                 try {
//                   const res = await fetch('http://localhost:4000/rag-chat', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({ question: userMessage }),
//                   });

//                   const data = await res.json();
//                   signals.onResponse({ text: data.answer });
//                 } catch (err) {
//                   signals.onResponse({ error: '🚨 Server error: Could not generate answer.' });
//                 }
//               },
//             }}
//           />
//         </div>
//       )}
//       <FontAwesomeIcon
//         alt="Chatbot Icon"
//         className="chatbot-icon"
//         onClick={() => setIsOpen(!isOpen)}
//         icon={faComment}
//         size="2x"
//       />
//     </>
//   );
// };
