import React, { useState, useEffect, useRef } from 'react'
import { Button } from 'primereact/button'
import { PrimeIcons } from 'primereact/api';
import { Toast } from 'primereact/toast';
/*Importer modal */
import { Dialog } from 'primereact/dialog';
import axios from 'axios'
import BundledEditor from './service/EditorTiny/BundledEditor';
import ReactToPrint from 'react-to-print'
import QRCode from 'react-qr-code'
import SaisieReglement from '../../../Reglement/SaisieReglement'
export default function CompteRendu(props) {


    let numQR = (props.date_arriv).replace(/\//g, "") + '' + (props.num_arriv);
    
    /*Word */
    const editorRef = useRef(null);
    let reportTemplateRef = useRef();
    const [content, setContent] = useState(null)

    const log = () => {
        if (editorRef.current) {
            let strin = JSON.stringify({ data: editorRef.current.getContent() });
            let pars = JSON.parse(strin);
            // console.log(pars.data)
            // console.log("'<html>" + pars.data + "</html>'");
            var myElement = document.getElementById("print");
            myElement.innerHTML = editorRef.current.getContent();
            // setdtXXX(editorRef.current.getContent())
            // setContent(editorRef.current.getContent())
            envoyeData(pars.data)
        }
    };
    /*Word */

    //Post Vers serveur node js
    const envoyeData = async (data) => {
        let conv = data;
        conv = conv.replace(/\//g, "*");
        let numDate = (props.date_arriv).replace(/\//g, "") + '' + (props.num_arriv);
        try {

            await axios.post(`http://localhost:5000/api/hello/${numDate}`, {
                headers: {
                    'Content-Type': 'text/html'
                },
                body: data
            })
                .then(
                    (result) => {
                        console.log(result)
                    }
                )
                .catch((e) => {
                    console.log(e)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const toastTR = useRef(null);
    /*Notification Toast */
    const notificationAction = (etat, titre, message) => {
        toastTR.current.show({ severity: etat, summary: titre, detail: message, life: 10000 });
    }

    /**Style css */

    const stylebtnRec = {
        fontSize: '1rem', padding: ' 0.8375rem 0.975rem', backgroundColor: '#a79d34', border: '1px solid #a79d34'
    };
    const stylebtnDetele = {
        fontSize: '1rem', padding: ' 0.8375rem 0.975rem', backgroundColor: 'rgb(195 46 46 / 85%)', border: '1px solid #d32f2fa1'
    };

    /**Style css */


    /* Modal */

    const [displayBasic2, setDisplayBasic2] = useState(false);
    const [position, setPosition] = useState('center');
    const dialogFuncMap = {
        'displayBasic2': setDisplayBasic2,
    }
    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    }
    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    const renderFooter = (name) => {
        return (
            <div>
                <Button label="Fermer" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" />
            </div>
        );
    }
    const renderHeader = (name) => {
        //Ovaina ho numero ny date
        let numDate = (props.date_arriv).replace(/\//g, "") + '' + (props.num_arriv);

        return (
            <div>
                <h4 className='mb-1'>Compte Rendu  : <i style={{ fontWeight: '800', color: 'black' }} >Date d'arrivée : {props.date_arriv} , numéro : {props.num_arriv} , Combinaison : {numDate} </i> </h4>
                <hr />
            </div>
        );
    }

    /** Fin modal */


    return (
        <>
            <Toast ref={toastTR} position="top-right" />

            <Button icon={PrimeIcons.BOOK} className='p-buttom-sm p-1 ml-4 p-button-success ' tooltip='Ajout compte rendu' tooltipOptions={{ position: 'top' }} onClick={() => { onClick('displayBasic2'); }} />

            <Dialog maximizable header={renderHeader('displayBasic2')} visible={displayBasic2} className="lg:col-8 md:col-9 col-10 p-0" footer={renderFooter('displayBasic2')} onHide={() => onHide('displayBasic2')}>
                        {/* <SaisieReglement/> */}
                <div className="p-1  style-modal-tamby">
                    <div className='mb-3'>
                        <BundledEditor
                            onInit={(evt, editor) => editorRef.current = editor}
                            initialValue='<div class="c x0 y1 w2 h0" ><div class="t m0 x1 h2 y2 ff1 fs0 fc0 sc0 ls4 ws3"> </div><div class="t m0 x1 h2 y3 ff1 fs0 fc0 sc0 ls0 ws3">Antananarivo, le <span class="ls4">3 janv<span class="_ _0"></span>ier 2023 </span></div><div class="t m0 x2 h2 y4 ff1 fs0 fc0 sc0 ls4 ws3"> </div><div class="t m0 x2 h2 y5 ff1 fs0 fc0 sc0 ls4 ws3"> </div><div class="t m0 x3 h2 y6 ff1 fs0 fc0 sc0 ls4 ws3">Cher confrère,<span class="_ _0"></span> </div><div class="t m0 x4 h2 y7 ff1 fs0 fc0 sc0 ls4 ws3"> </div><div class="t m0 x4 h2 y8 ff1 fs0 fc0 sc0 ls4 ws3"> </div><div class="t m0 x4 h2 y9 ff1 fs0 fc0 sc0 ls0 ws3">Nous vous remercions <span class="_ _0"></span>de votre confiance pour nous avoi<span class="_ _0"></span>r adressé votre </div><div class="t m0 x4 h3 ya ff1 fs0 fc0 sc0 ls4 ws3">patiente <span class="ff2">Madame <span class="_ _0"></span> </span></div><div class="t m0 x4 h2 yb ff3 fs0 fc0 sc0 ls4 ws3">Suite à votre demande, <span class="_ _0"></span>elle a bénéficié de l’ex<span class="_ _0"></span>amen suivant<span class="ff1"> :<span class="_ _0"></span> </span></div><div class="t m0 x4 h3 yc ff2 fs0 fc0 sc0 ls4 ws3">Echographie abdo<span class="_ _0"></span>minale </div><div class="t m0 x4 h2 yd ff1 fs0 fc0 sc0 ls4 ws3">dont voici le compte<span class="_ _0"></span>-rendu : </div><div class="t m0 x5 h2 ye ff1 fs0 fc0 sc0 ls4 ws3"> </div><div class="t m0 x5 h3 yf ff2 fs0 fc0 sc0 ls4 ws3"> </div><div class="t m0 x5 h3 y10 ff2 fs0 fc0 sc0 ls4 ws3"> </div><div class="t m0 x5 h3 y11 ff2 fs0 fc0 sc0 ls1 ws3">Foie <span class="ff3 ls4">de taille normale, <span class="_ _0"></span>de contours régulier<span class="_ _0"></span>s. L’échostructure est <span class="_ _0"></span>homogène  sans </span></div><div class="t m0 x5 h2 y12 ff1 fs0 fc0 sc0 ls4 ws3">formation nodulaire cir<span class="_ _0"></span>conscrite.<span class="_ _0"></span> </div><div class="t m0 x5 h2 y13 ff1 fs0 fc0 sc0 ls0 ws3">Veine porte et veines s<span class="_ _0"></span>us<span class="ls4">-hépatiques ho<span class="_ _0"></span>mogènes, de calibre nor<span class="_ _0"></span>mal. </span></div><div class="t m0 x5 h3 y14 ff2 fs0 fc0 sc0 ls0 ws3">Vésicule biliaire<span class="ff1 ls4"> alithi<span class="_ _0"></span>asique sans anomalie p<span class="_ _0"></span><span class="ls2 ws0">ariétale.</span> </span></div><div class="t m0 x5 h2 y15 ff1 fs0 fc0 sc0 ls0 ws3">Voies biliaires intra et <span class="_ _0"></span>extra<span class="ls4">-hépatiques no<span class="_ _0"></span>n dilatées. </span></div><div class="t m0 x5 h3 y16 ff2 fs0 fc0 sc0 ls1 ws1">Pancréas<span class="ff1 ls4 ws3"> de morpholo<span class="_ _0"></span>gie normale sans n<span class="_ _0"></span>odule tissulaire ni k<span class="_ _0"></span>yste ni calcification.<span class="_ _0"></span> </span></div><div class="t m0 x5 h2 y17 ff1 fs0 fc0 sc0 ls4 ws3">Pas de dilatation du <span class="_ _0"></span>Wirsung. </div><div class="t m0 x5 h3 y18 ff2 fs0 fc0 sc0 ls0 ws3">Rate <span class="ff1 ls4">de volume norma<span class="_ _0"></span>l, homogène.<span class="_ _0"></span> </span></div><div class="t m0 x5 h3 y19 ff2 fs0 fc0 sc0 ls0 ws2">Reins<span class="ff1 ls4 ws3"> de taille, de for<span class="_ _0"></span>me et de situation n<span class="_ _0"></span>or<span class="ff3 ls5">males. L’écho<span class="_ _0"></span>structure est bien dif<span class="_ _0"></span>férenciée. <span class="_ _0"></span></span> </span></div><div class="t m0 x5 h2 y1a ff1 fs0 fc0 sc0 ls4 ws3">Pas de dilatation des ca<span class="_ _0"></span>vités pyélo-<span class="ls2">calicielle<span class="_ _0"></span>s ni de lithiase échographi<span class="_ _0"></span>quement visible.</span> </div><div class="t m0 x5 h3 y1b ff2 fs0 fc0 sc0 ls0 ws3">Utérus et ovaires <span class="ff1 ls4">sans <span class="_ _0"></span>anomalie. </span></div><div class="t m0 x5 h2 y1c ff1 fs0 fc0 sc0 ls4 ws3">Pas de masse abdomin<span class="_ _0"></span>ale. </div><div class="t m0 x5 h3 y1d ff2 fs0 fc0 sc0 ls0 ws2">Vessie<span class="ff1 ls4 ws3"> de contours rég<span class="_ _0"></span>uliers sans ano<span class="_ _0"></span>malie pariétale ni lithi<span class="_ _0"></span>ase, ni tumeur.<span class="_ _0"></span> </span></div><div class="t m0 x5 h2 y1e ff3 fs0 fc0 sc0 ls4 ws3">Pas d’épanchement intr<span class="_ _0"></span>a<span class="ff1">-péritonéal.<span class="_ _0"></span> </span></div><div class="t m0 x5 h2 y1f ff1 fs0 fc0 sc0 ls4 ws3"> </div><div class="t m0 x5 h3 y20 ff2 fs0 fc0 sc0 ls0 ws2">Conclusion<span class="ff1 ls4 ws3"> : </span></div><div class="t m0 x5 h2 y21 ff1 fs0 fc0 sc0 ls4 ws3"> </div><div class="t m0 x5 h3 y22 ff2 fs0 fc0 sc0 ls4 ws3">Echographie abdo<span class="_ _0"></span>minale normale.<span class="_ _0"></span> </div><div class="t m0 x5 h2 y23 ff1 fs0 fc0 sc0 ls4 ws3"> </div><div class="t m0 x5 h2 y24 ff1 fs0 fc0 sc0 ls3 ws3"> <span class="ls4 v1">Bien confraternellemen<span class="_ _0"></span>t </span></div><div class="t m0 x5 h2 y25 ff1 fs0 fc0 sc0 ls4 ws3"> </div><div class="t m0 x5 h2 y26 ff1 fs0 fc0 sc0 ls3 ws3"> <span class="ls4 v1"> </span></div><div class="t m0 x6 h2 y27 ff1 fs0 fc0 sc0 ls0 ws3">Docteur RAZAFINDR<span class="_ _0"></span>ATRIMO Francis<span class="ls4"> </span></div><div class="t m0 x7 h2 y28 ff1 fs0 fc0 sc0 ls4 ws3"> </div><div class="t m0 x5 h4 y29 ff1 fs1 fc0 sc0 ls4 ws3"> </div><div class="t m0 x5 h4 y2a ff1 fs1 fc0 sc0 ls4 ws3"> </div><div class="t m0 x5 h4 y2b ff1 fs1 fc0 sc0 ls4 ws3"> </div></div>'
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist', 'anchor', 'autolink', 'help', 'image', 'link', 'lists',
                                    'searchreplace', 'table', 'wordcount', 'pagebreak',
                                ],
                                toolbar: 'undo redo | blocks | ' +
                                    'bold italic forecolor | alignleft aligncenter ' + 'alignright alignjustify | bullist numlist outdent indent | ' + 'table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol' +
                                    'removeformat | help',
                                language: 'fr_FR',

                                content_style: 'body { font-family:Helvetica,Arial,sans-serif;min-height:21cm;padding:3px 25px;margin:0 20%;clip-path:inset(-15px -15px 0px -15px); box-shadow:0 0 3px 0px rgba(0, 0, 0, 0.219); font-size:12px } '
                            }}
                        />
                    </div>
                    <button onClick={log} className="p-button mr-2">Enregistrer ici avant generation pdf</button>
                    <ReactToPrint trigger={() => <button className="p-button">
                        Generer pdf
                    </button>} content={() => reportTemplateRef} />
                </div>
            </Dialog>
        <div className='hidden'>
        <div  ref={(el) => (reportTemplateRef = el)}>
                <div className="flex justify-content-end w-100" >
                   
                    <div style={{width:"45px",height:"45px"}}>
                    <QRCode 
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={numQR}
                        viewBox={`0 0 256 256`}
                    />
                    </div>
                </div>
                <div id="print" style={{fontSize:'1.4em'}}></div>
            </div>
        </div>
        </>
    )
}
