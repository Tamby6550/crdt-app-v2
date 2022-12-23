import React, { useState, useEffect, useRef } from 'react'
import { Button } from 'primereact/button'
import { PrimeIcons } from 'primereact/api';
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast';

import { InputTextarea } from 'primereact/inputtextarea';
/*Importer modal */
import { Dialog } from 'primereact/dialog';
import axios from 'axios'
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputMask } from 'primereact/inputmask';

export default function Modification(props) {

    //Declaration useSatate
    const [infoClient, setinfoClient] = useState({ code_client: '', nom: '', description: '', rc: '', stat: '', nif: '', cif: '' });
    const [verfChamp, setverfChamp] = useState({ code_client: false, nom: false });
    const [charge, setcharge] = useState({ chajoute: false });
    const oncharger = (data) => {
        setinfoClient({ code_client: data.code_client, nom: data.nom, description: data.description, rc: data.rc, stat: data.stat, nif: data.nif, cif: data.cif });
    }
    const onVideInfo = () => {
        setinfoClient({ code_client: '', nom: '', description: '', rc: '', stat: '', nif: '', cif: '' });
    }



    //Affichage notification Toast primereact (del :7s )
    const toastTR = useRef(null);
    const notificationAction = (etat, titre, message) => {
        toastTR.current.show({ severity: etat, summary: titre, detail: message, life: 10000 });
    }

    /**Style css */
    const stylebtnRec = {
        fontSize: '1rem', padding: ' 0.8375rem 0.975rem', backgroundColor: '#a79d34', border: '1px solid #a79d34'
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
        return (
            <div>
                <h4 className='mb-1'>Modification  Prescripteur </h4>
                <hr />
            </div>
        );
    }
    /** Fin modal */



    const onSub = async () => { //Ajout de donnees vers Laravel
        setverfChamp({ code_client: false, nom: false })
        setcharge({ chajoute: true });
        await axios.put(props.url + 'updateClientFact', infoClient)
            .then(res => {
                notificationAction(res.data.etat, 'Modification', res.data.message);//message avy @back
                setcharge({ chajoute: false });
                onVideInfo()
                props.setrefreshData(1);
                // onHide('displayBasic2');
            })
            .catch(err => {
                console.log(err);
                notificationAction('error', 'Erreur', err.data.message);//message avy @back
                setcharge({ chajoute: false });
            });
    }
    return (
        <>
            <Toast ref={toastTR} position="top-right" />
            <Button icon={PrimeIcons.PENCIL} className='p-buttom-sm p-1 mr-2 ' style={stylebtnRec} tooltip='Modifier' onClick={() => { onClick('displayBasic2'); oncharger(props.data) }} />

            <Dialog header={renderHeader('displayBasic2')} visible={displayBasic2} style={{ width: '40vw' }} footer={renderFooter('displayBasic2')} onHide={() => onHide('displayBasic2')}>
            <div className="p-1 style-modal-tamby" >
                        <form className='flex flex-column justify-content-center'>
                            <div className='grid px-4'>
                                <div className="lg:col-3  field my-0  flex flex-column">
                                    <label htmlFor="username2" className="label-input-sm">Code</label>
                                    <InputText id="username2" value={infoClient.code_client} aria-describedby="username2-help" name='code_client' className={verfChamp.code_client ? "form-input-css-tamby p-invalid" : "form-input-css-tamby"} onChange={(e) => { setinfoClient({ ...infoClient, [e.target.name]: e.target.value }) }} />
                                    {verfChamp.code_client ? <small id="username2-help" className="p-error block">Id patient vide !</small> : null}
                                </div>
                            </div>

                            <div className='grid px-4'>
                                
                                <div className="lg:col-2 md:col-3 col-3 field my-0 flex flex-column">
                                    <label htmlFor="username2" className="label-input-sm">Appelation</label>
                                    <Dropdown options={props.choixPresc}  />
                                </div>
                                <div className="lg:col-10 md:col-9 col-9 field my-0 flex flex-column">
                                <label htmlFor="username2" className="label-input-sm">Nom*</label>
                                    <InputText id="username2" value={infoClient.nom} aria-describedby="username2-help" className={verfChamp.nom ? "form-input-css-tamby p-invalid" : "form-input-css-tamby"} name='nom' onChange={(e) => { setinfoClient({ ...infoClient, [e.target.name]: (e.target.value).toUpperCase() }) }} />
                                </div>
                             
                            </div>
                            <div className='grid px-4'>
                                <div className="lg:col-6 col-12 field my-0  flex flex-column ">
                                    <label htmlFor="username2" className="label-input-sm">Phone 1</label>
                                   <InputMask mask='099 99 999 99'/>
                                </div>
                                <div className="lg:col-6 col-12 field my-0  flex flex-column ">
                                    <label htmlFor="username2" className="label-input-sm">Phone 2</label>
                                   <InputMask mask='099 99 999 99'/>
                                </div>
                                <div className="col-12 lg:col-6 field my-0 flex flex-column">
                                <label htmlFor="username2" className="label-input-sm">Mobile</label>
                                    <InputText id="username2" value={infoClient.nom} aria-describedby="username2-help" className={verfChamp.nom ? "form-input-css-tamby p-invalid" : "form-input-css-tamby"} name='nom' onChange={(e) => { setinfoClient({ ...infoClient, [e.target.name]: (e.target.value).toUpperCase() }) }} />
                                </div>
                                <div className="col-12 lg:col-6 field my-0 flex flex-column">
                                <label htmlFor="username2" className="label-input-sm">Adresse</label>
                                    <InputText id="username2" value={infoClient.nom} aria-describedby="username2-help" className={verfChamp.nom ? "form-input-css-tamby p-invalid" : "form-input-css-tamby"} name='nom' onChange={(e) => { setinfoClient({ ...infoClient, [e.target.name]: (e.target.value).toUpperCase() }) }} />
                                </div>
                            </div>


                        </form>
                        <div className='flex mt-3 mr-4 justify-content-end'>
                            <Button icon={PrimeIcons.SAVE} className='p-button-sm p-button-primary ' label={charge.chajoute ? 'Enregistrement...' : 'Enregistrer'} onClick={() => {
                                infoClient.code_client != "" ?
                                    infoClient.nom != "" ?
                                        onSub()
                                        :
                                        setverfChamp({ code_client: false, nom: true })
                                    :
                                    setverfChamp({ code_client: true, nom: false })
                            }} />
                        </div>
                    </div>
            </Dialog>
        </>
    )
}
