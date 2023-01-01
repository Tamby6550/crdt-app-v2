import React, { useState, useEffect, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { PrimeIcons } from 'primereact/api'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { BlockUI } from 'primereact/blockui';
import { ProgressSpinner } from 'primereact/progressspinner';
import AjoutExamen from './ExamenNonEffe/AjoutExamen'
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { Tag } from 'primereact/tag';


export default function ExamenNonEff(props) {
    //Block Chargement
    const [blockedDocument, setBlockedDocument] = useState(true);

    //Chargement de données
    const [charge, setCharge] = useState(true);
    const [refreshData, setrefreshData] = useState(0);
    const [listExamenNonEff, setlistExamenNonEff] = useState([{ numero: '', date_arr: '', id_patient: '', type_pat: '', verf_exam: '', nom: '', date_naiss: '', telephone: '' }]);
    const [infoRegistre, setinfoRegistre] = useState({ num_arriv: '', date_arriv: '', id_patient: '' });

    const onVide = () => {
        setinfoRegistre({ num_arriv: '', date_arriv: '', id_patient: '' })
    }

    const [totalenrg, settotalenrg] = useState(null)


    /**Style css */
    const stylebtnRec = {
        fontSize: '1rem', padding: ' 0.8375rem 0.975rem', backgroundColor: 'rgb(34, 197, 94)', border: '1px solid rgb(63 209 116)'
    };
    const stylebtnDetele = {
        fontSize: '1rem', padding: ' 0.8375rem 0.975rem', backgroundColor: 'rgb(195 46 46 / 85%)', border: '1px solid #d32f2fa1'
    };

    /**Style css */

    const toastTR = useRef(null);
    /*Notification Toast */
    const notificationAction = (etat, titre, message) => {
        toastTR.current.show({ severity: etat, summary: titre, detail: message, life: 10000 });
    }



    //Get List patient
    const loadData = async () => {
        onVide();

        await axios.get(props.url + `getExamenNonEff`)
            .then(
                (result) => {
                    setrefreshData(0);
                    setlistExamenNonEff(result.data);
                    setBlockedDocument(false);
                    setCharge(false);

                }
            );
    }

    useEffect(() => {
        setCharge(true);
        setBlockedDocument(true);
        setlistExamenNonEff([{ nom: 'Chargement de données...' }])
        setTimeout(() => {
            loadData();
        }, 800)
    }, [refreshData]);




    const header = (
        <div className='flex flex-row justify-content-center align-items-center m-0 '>
            <h3 className='m-3'>Examens à éffectuées</h3>
        </div>
    )

    const bodyBoutton = (data) => {
        return (
            <div className='flex flex-row justify-content-between align-items-center m-0 '>
                <div className='my-0  py-2'>
                    <AjoutExamen url={props.url} type_pat={data.type_pat} data={data} />
                </div>
            </div>
        )
    }
  

    return (
        <>
            <Toast ref={toastTR} position="top-right" />
            <ConfirmDialog />

            <div className="flex flex-column justify-content-center">
                <BlockUI blocked={blockedDocument} template={<ProgressSpinner />}>
                    <DataTable header={header} value={listExamenNonEff} responsiveLayout="scroll" className='bg-white' emptyMessage={"Aucun examen à éffectuées"} >

                        <Column field='numero' header={'Numéro d\'Arrivée'} style={{ fontWeight: '600' }}></Column>
                        <Column field={'date_arr'} header={'Date d\'Arrivée'} style={{ fontWeight: '600' }}></Column>
                        <Column field={'id_patient'} header="ID" style={{ fontWeight: '600' }}></Column>
                        <Column field='nom' header="Nom"></Column>
                        <Column field='date_naiss' header="Date_Naiss"></Column>
                        <Column field='type_pat' header="Tarif"></Column>
                        <Column header="Action" body={bodyBoutton} align={'left'}></Column>
                        {/* <Column field='telephone' header="Tél"></Column> */}
                    </DataTable>
                </BlockUI>

            </div>
        </>
    )
}
