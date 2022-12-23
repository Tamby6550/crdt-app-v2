// import { Card } from 'primereact/card';
// import React, { useEffect, useState } from 'react'
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// export default function SaisieReglement() {
//   const [value, setValue] = useState('');
//   const modules = {
//     toolbar: [
//       //[{ 'font': [] }],
//       [{ header: [1, 2, false] }],
//       ["bold", "italic", "underline", "strike", "blockquote"],
//       [
//         { list: "ordered" },
//         { list: "bullet" },
//         { indent: "-1" },
//         { indent: "+1" },
//       ],
//       ["link", "image"],
//       [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
//       ["clean"],
//     ],
//   };

//   const formats = [
//     //'font',
//     "header",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "blockquote",
//     "list",
//     "bullet",
//     "indent",
//     "link",
//     "image",
//     "align",
//     "color",
//     "background",
//   ];
//   useEffect(() => {
//     console.log(value)
//   }, [value])
//   return (
//     <div className='grid justify-content-center'>

//       <div className='col-12 lg:col-10 h-100'>

//         <div className='text-center'><h3>Saisie Reglement</h3></div>
//         <ReactQuill theme="snow" modules={modules} style
//           formats={formats} value={value} onChange={setValue} />

//       </div>
//     </div>
//   )
// }

import React, { useRef, useState } from 'react';
import BundledEditor from '../../service/EditorTiny/BundledEditor';
import jsPDF from 'jspdf';
import Facture from '../Facture';

export default function App() {
  const editorRef = useRef(null);
  const reportTemplateRef = useRef(null);
  const [content, setContent] = useState(null)
  const handleGeneratePdf = () => {
    const doc = new jsPDF({
      format: 'a4',
      unit: 'px',
    });

    // Adding the fonts.
    doc.setFont('Inter-Regular', 'normal');

    doc.html(reportTemplateRef.current, {
      async callback(doc) {
        await doc.save('document');
      },
    });
  };
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      var myElement = document.getElementById("test");
      myElement.innerHTML = editorRef.current.getContent();

      setContent(editorRef.current.getContent())
    }
  };
  return (
    <div className=''>
     <div >
     <BundledEditor
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue='<p>Ito no donne donne initial afaka atao anaty use state ,forme string en forme html.</p>'
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'anchor', 'autolink', 'help', 'image', 'link', 'lists',
            'searchreplace', 'table', 'wordcount','pagebreak',
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif;width:21cm,height:100%;padding:0 10px;clip-path:inset(0px -15px 0px -15px); margin:0 4cm;box-shadow:0 0 3px 0px rgba(0, 0, 0, 0.219); font-size:12px }'
        }}
      />
     </div>
      <button onClick={log}>Enregistrer ici avant generation pdf</button>

      <button className="button" onClick={handleGeneratePdf}>
        Generer pdf
      </button>
    <div style={{visibility:"hidden"}}>
    <div className='ito' ref={reportTemplateRef}>
        <div>
          <div id='test' className='col-12 amboaro'></div>
        </div>
      </div>
    </div>
    </div>
  );
}