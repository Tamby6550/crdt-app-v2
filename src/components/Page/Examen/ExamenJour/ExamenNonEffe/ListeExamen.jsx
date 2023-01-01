import React, { useState, useEffect, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { PrimeIcons } from 'primereact/api'
import { Dialog } from 'primereact/dialog';
import Recherche from '../../../Examen_referentiel/Recherche'
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { BlockUI } from 'primereact/blockui';
import { ProgressSpinner } from 'primereact/progressspinner';
import PopConfirm from './PopConfirm'

export default function ListeExamen(props) {

    //Block Chargement
    const [blockedDocument, setBlockedDocument] = useState(true);

    //Chargement de données
    const [charge, setCharge] = useState(true);
    const [refreshData, setrefreshData] = useState(0);
    const [listexamen, setlistexamen] = useState([{ id_examen: '', lib: '', code_tarif: '', type: '', montant: '', tarif: '' }]);
    const [infoexamen, setinfoexamen] = useState({ id_examen: '', lib: '', code_tarif: '', type: '', tarif: '', montant: '' });
    const onVideInfo = () => {
        setinfoexamen({ id_examen: '', lib: '', code_tarif: '', type: '', montant: '', tarif: '' });
    };
    const [totalenrg, settotalenrg] = useState(null)

    /**Style css */
    const stylebtnRec = {
        fontSize: '1rem', padding: ' 0.8375rem 0.975rem', backgroundColor: '#a79d34', border: '1px solid #a79d34'
    };
    const stylebtnCheck = {
        fontSize: '0.5rem', padding: ' 0.8rem 0.5rem', backgroundColor: '#2196F3', border: '1px solid #2196F3'
    };


    /**Style css */



    const toastTR = useRef(null);
    /*Notification Toast */
    const notificationAction = (etat, titre, message) => {
        toastTR.current.show({ severity: etat, summary: titre, detail: message, life: 3000 });
    }


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
                <h4 className='mb-1'>Choisir un examen</h4>
                <hr />
            </div>
        );
    }
    /** Fin modal */

    //Get List client
    const loadData = async () => {
        await axios.get(props.url + `rechercheExamParTarif/${props.type_pat}`)
            .then(
                (result) => {
                    onVideInfo();
                    setrefreshData(0);
                    setlistexamen(result.data);
                    setBlockedDocument(false);
                    setCharge(false);
                    // localStorage.setItem("listexamen", JSON.stringify(result.data));
                }
            );
    }


    const chargementData = () => {
    //    console.log(localStorage.getItem("listexamen"))
        // if (localStorage.getItem("listexamen")===null || localStorage.getItem("listexamen")===undefined  ) {
            setCharge(true);
            setBlockedDocument(true);
            setlistexamen([{ code_tarif: 'Chargement de données...' }]);
            setTimeout(() => {
                loadData();
            }, 200)
        // }else{
        //     let storelisteexamen = JSON.parse(localStorage.getItem("listexamen"));
        //     setlistexamen(storelisteexamen)
        // }
    }


    const header = (
        <div className='flex flex-row justify-content-between align-items-center m-0 '>
            <div className='my-0 ml-2 py-2 flex'>
                <Recherche icon={PrimeIcons.SEARCH} setCharge={setCharge} setlistexamen={setlistexamen} setrefreshData={setrefreshData} url={props.url} infoexamen={infoexamen} setinfoexamen={setinfoexamen} tarif={props.type_pat} />
                {infoexamen.lib == "" && infoexamen.tarif == "" && infoexamen.type == "" && infoexamen.code_tarif == "" ? null : <label className='ml-5 mt-2'>Resultat de recherche ,   Libelle : <i style={{ fontWeight: '700' }}>"{(infoexamen.lib).toUpperCase()}"</i>  , tarif : <i style={{ fontWeight: '700' }}>"{(infoexamen.tarif).toUpperCase()}"</i>, Cotation : <i style={{ fontWeight: '700' }}>"{(infoexamen.code_tarif).toUpperCase()}"</i> , Type : <i style={{ fontWeight: '700' }}>"{(infoexamen.type).toUpperCase()}"</i>   </label>}
            </div>
            {/* {infoexamen.lib != "" || infoexamen.tarif != "" || infoexamen.type != "" || infoexamen.code_tarif != "" ? <Button icon={PrimeIcons.REFRESH} tooltipOptions={{ position: 'top' }} className='p-buttom-sm p-1 p-button-warning ' tooltip='actualiser' onClick={() => setrefreshData(1)} />
                :
                <>
                    <label >Liste des Examens , Tarif ({props.type_pat})  </label>
                    <label className='ml-5 mt-1' style={{ visibility: 'hidden' }}>Total enregistrement  </label>
                </>
            } */}

        </div>
    )

    const bodyBoutton = (data) => {
        return (
            <div className='flex flex-row justify-content-between align-items-center m-0 '>
                <div className='my-0  py-2'>
                    <PopConfirm data={data} index={props.index}  handleChange={props.handleChange} onHide={onHide} />

                </div>
            </div>
        )
    }
 

    return (
        <>
            <Toast ref={toastTR} position="top-right" />

            <Button icon={PrimeIcons.SEARCH} className='p-buttom-sm p-1 mr-2 ' style={stylebtnRec} tooltip='Recherche Patient' onClick={() => { onClick('displayBasic2'); chargementData() }} />

            <Dialog header={renderHeader('displayBasic2')} visible={displayBasic2} className="lg:col-7 md:col-10 col-12 p-0" footer={renderFooter('displayBasic2')} onHide={() => onHide('displayBasic2')}>
                <div className="p-1  style-modal-tamby">
                    <div className="flex flex-column justify-content-center">
                        <BlockUI blocked={blockedDocument} template={<ProgressSpinner />}>
                            <DataTable header={header} value={listexamen} responsiveLayout="scroll" className='bg-white' emptyMessage={'Aucun resultat trouvé'} style={{ fontSize: '1em' }}>
                                <Column field='id_examen' header="Id"></Column>
                                <Column field='lib' header="Libellé"></Column>
                                <Column field='tarif' header="Tarif"></Column>
                                <Column field='code_tarif' header="Cotation"></Column>
                                <Column field='montant' header="Montant"></Column>
                                <Column field='types' header="Type"></Column>
                                <Column header="action" body={bodyBoutton} align={'left'}></Column>
                            </DataTable>
                        </BlockUI>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
