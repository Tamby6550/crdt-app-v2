import React, { useState, useEffect, useRef } from 'react'
import { Button } from 'primereact/button'
import { PrimeIcons } from 'primereact/api';
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast';
import PatientM from './PatientM';
import Registre from '../../Patient_c/Registre';/*Importer modal */
import { Dialog } from 'primereact/dialog';
import axios from 'axios'

export default function Modifier(props) {

    //Declaration useSatate
    const [infoRegistre, setinfoRegistre] = useState({ num_arriv: '', date_arriv: '', id_patient: '', type_pat: '', verf_exam: '',prenom:'', nom: '', date_naiss: '', telephone: '' });
    const oncharger = (data) => {
        setinfoRegistre({ num_arriv: data.numero, date_arriv: data.date_arr, id_patient: '', type_pat: '',prenom:'', verf_exam: '', nom: '', date_naiss: '', telephone: '' });
    }




    //Affichage notification Toast primereact (del :3s )
    const toastTR = useRef(null);
    const notificationAction = (etat, titre, message) => {
        toastTR.current.show({ severity: etat, summary: titre, detail: message, life: 3000 });
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
                <h4 className='mb-1'>Modification  N° Arrivé </h4>
                <hr />
            </div>
        );
    }
    /** Fin modal */



    return (
        <>
            <Toast ref={toastTR} position="top-right" />
            <Button icon={PrimeIcons.PENCIL} className='p-buttom-sm p-1 mr-2 ' style={stylebtnRec} tooltip='Modifier' tooltipOptions={{ position: 'top' }} onClick={() => { onClick('displayBasic2'); oncharger(props.data) }} />

            <Dialog header={renderHeader('displayBasic2')} visible={displayBasic2} className="lg:col-5 md:col-8 col-11 p-0" footer={renderFooter('displayBasic2')} onHide={() => onHide('displayBasic2')}>
                <div className="p-1  style-modal-tamby">
                    <div className='flex flex-row justify-content-around  ' >
                        <div>
                            <u><h3>Numéro et Date d'arrivé</h3></u>
                            <h4>Numéro d'arrivée :  <u style={{ color: 'rgb(34, 197, 94)', fontWeight: 'bold', fontSize: '1.4rem' }}> {infoRegistre.num_arriv}</u>  </h4>
                            <h4>Aujourd'hui : <u style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{infoRegistre.date_arriv}</u>  </h4>
                        </div>
                        <div>
                            <u><h3>Patient en ce moment</h3></u>
                            <h4><u>Id patient</u>   : <u style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{props.data.id_patient} </u>  </h4>
                            <h4><u>Nom <small>(Type)</small></u>  : <label >{props.data.nom } <small>({props.data.type_pat})</small></label>  </h4>
                            <h4><u>Date de naissance </u> :    <label >{props.data.date_naiss}</label>  </h4>
                            <h4><u>Téléphone</u>  :  <label >{props.data.telephone}</label> </h4>
                        </div>
                    </div>
                    <hr />
                    <div className='flex flex-row justify-content-around  '>
                        <div >
                            <u><h3>Choisir un patient</h3></u>
                            <PatientM url={props.url} setinfoRegistre={setinfoRegistre}  infoRegistre={infoRegistre} />
                        </div>
                        <div className='mr-1'>
                            <u><h3>Nouveau Patient</h3></u>
                            <h4><u>Id patient</u>   : <u style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{infoRegistre.id_patient} </u>  </h4>
                            <h4><u>Nom <small>(Type)</small></u>  : <label >{infoRegistre.nom+' '+infoRegistre.prenom}<small> ({infoRegistre.type_pat})</small></label>  </h4>
                            <h4><u>Date de naissance </u> :    <label >{infoRegistre.date_naiss}</label>  </h4>
                            <h4><u>Téléphone</u>  :  <label >{infoRegistre.telephone}</label> </h4>
                        </div>
                    </div>

                    <div className='flex mt-3 mr-4 justify-content-center'>
                    <Registre onHideM={onHide} setrefreshData={props.setrefreshData} url={props.url} ancien_id={props.data.id_patient} id_patient={infoRegistre.id_patient} nom={infoRegistre.nom+' '+infoRegistre.prenom}  date_naiss={infoRegistre.date_naiss} telephone={infoRegistre.telephone} tambyR={'modifier'}  num_arriv={infoRegistre.num_arriv} date_arriv={infoRegistre.date_arriv} />
                    </div>
                </div>
            </Dialog>
        </>
    )
}
