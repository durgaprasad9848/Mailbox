import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import{Card} from 'react-bootstrap';
import { useRef } from 'react';
import axios from 'axios';

const ComposeMail = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const recmail = useRef();
  const sub = useRef();

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const sendMail = async() => {
    const mailContent = editorState.getCurrentContent().getPlainText();
    console.log(mailContent);
    console.log(recmail.current.value,sub.current.value);
    // Send the mail using the mailContent variable
    
   
        const recdata = {
          subject: sub.current.value,
          description: mailContent,
          receiveremail: recmail.current.value,
          isVisited:false,
        };
        //Storing in send mail
        await axios
        .post(
          `https://test-api-c7d27-default-rtdb.firebaseio.com/${localStorage.getItem('email').replace("@gmail.com","")}/send.json`,
          recdata
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });







        const senddata = {
          subject: sub.current.value,
          description: mailContent,
          senderemail: localStorage.getItem("email").replace("@gmail.com",""),
      
          isVisited:false,
        };
  
      
        //Storing in receiver mail
        await axios
          .post(
            `https://test-api-c7d27-default-rtdb.firebaseio.com/${recmail.current.value.replace("@gmail.com","")}/receive.json`,
            senddata
          )
          .then((response) => {
            console.log(response);
            sub.current.value = "";
            recmail.current.value = "";
            setEditorState(EditorState.createEmpty())
          })
          .catch((error) => {
            console.log(error);
          });

    }

  return (
    <div>
      <h1>Compose Mail</h1>
      <Card><form><label for ="To">To</label> <input type="text" ref={recmail}></input></form></Card>
      <Card><form><label for ="Sub">Sub</label> <input type="text" ref ={sub}></input></form></Card>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded'],
          inline: {
            options: ['bold', 'italic', 'underline'],
          },
          blockType: {
            options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
          },
          fontFamily: {
            options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
          },
          textAlign: {
            options: ['left', 'center', 'right', 'justify'],
          },
          link: {
            defaultTargetOption: '_blank',
          },
        }}
      />
      <button onClick={sendMail}>Send Mail</button>
    </div>
  );
};

export default ComposeMail;
