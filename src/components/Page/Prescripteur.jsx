import React, { useState, useEffect, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import {Dropdown} from 'primereact/dropdown'
import { PrimeIcons } from 'primereact/api'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import Insertion from './Prescripteur_c/Insertion'
import Modification from './Prescripteur_c/Modification'
import Recherche from './Prescripteur_c/Recherche'
import Voir from './Prescripteur_c/Voir'
import axios from 'axios';
import { Toast } from 'primereact/toast';


export default function Prescripteur(props) {

    //Chargement de données
    const [charge, setCharge] = useState(true);
    const [refreshData, setrefreshData] = useState(0);
    const [listClient, setlistClient] = useState([{ code_client: '', nom: '', description: '', rc: '', stat: '', nif: '', cif: '' }]);
    const [infoClient, setinfoClient] = useState({ code_client: '', nom: '', description: '', rc: '', stat: '', nif: '', cif: '' });
    const onVideInfo = () => {
        setinfoClient({ code_client: '', nom: '', description: '', rc: '', stat: '', nif: '', cif: '' });
    }
    const choixPresc = [
      {label: 'Pr', value:'Pr'},
      {label: 'Dr', value:'Dr'}
    ]
    const choixSexe = [
      {label: 'Homme', value:'M'},
      {label: 'Femme', value:'F'},

    ]
    /**Style css */
    const stylebtnRec = {
        fontSize: '1rem', padding: ' 0.8375rem 0.975rem', backgroundColor: '#a79d34', border: '1px solid #a79d34'
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


    //Get List client
    const loadData = async () => {
        setCharge(true);
        setlistClient([{ stat: 'Chargement de données...' }])
        await axios.get(props.url + `getClientFact`)
            .then(
                (result) => {
                    onVideInfo();
                    setrefreshData(0);
                    setlistClient(result.data);
                    setCharge(false);
                }
            );
    }

    useEffect(() => {
        loadData();
    }, [refreshData]);

  
  

    const header = (
        <div className='flex flex-row justify-content-between align-items-center m-0 '>
            <div className='my-0 ml-2 py-2 flex'>
                <Insertion url={props.url} choixPresc={choixPresc}  setrefreshData={setrefreshData} />
                <Recherche icon={PrimeIcons.SEARCH} setCharge={setCharge} setlistClient={setlistClient} setrefreshData={setrefreshData} url={props.url} infoClient={infoClient} setinfoClient={setinfoClient} />
                {infoClient.code_client == "" && infoClient.nom == "" ? null : <small className='ml-5'>Resultat de recherche ,   code client : <i style={{ fontWeight: '700' }}>"{(infoClient.code_client).toUpperCase()}"</i>  , Nom : <i style={{ fontWeight: '700' }}>"{(infoClient.nom).toUpperCase()}"</i>  </small>}
            </div>
            {infoClient.code_client != "" || infoClient.nom != "" ? <Button icon={PrimeIcons.REFRESH} className='p-buttom-sm p-1 p-button-warning ' tooltip='actualiser' onClick={() => setrefreshData(1)} /> : null}
        </div>
    )

    const bodyBoutton = (data) => {
        return (
            <div className='flex flex-row justify-content-between align-items-center m-0 '>
                <div className='my-0  py-2'>
                    {/* <Button icon={PrimeIcons.EYE} className='p-buttom-sm p-1 mr-2' onClick={() => { alert('Nom : ' + data.nom + ' !') }} tooltip='Voir' /> */}
                    <Voir data={data} url={props.url} setrefreshData={setrefreshData} />
                    <Modification data={data} url={props.url} setrefreshData={setrefreshData} />
                    <Button icon={PrimeIcons.TIMES} className='p-buttom-sm p-1 ' style={stylebtnDetele} tooltip='Supprimer'
                        onClick={() => {
                           
                            const accept = () => {
                                axios.delete(props.url + `deleteClientFact/${data.code_client}`)
                                    .then(res => {
                                        notificationAction('info', 'Suppression reuissie !', 'Enregistrement bien supprimer !');
                                        setrefreshData(1)
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        notificationAction('error', 'Suppression non reuissie !', 'Enregirement non supprimer !');
                                    })
                            }
                            const reject = () => {
                                return null;
                        
                            }

                            confirmDialog({
                                message: 'Voulez vous supprimer l\'enregistrement : ' + data.code_client,
                                header: 'Suppression  ',
                                icon: 'pi pi-exclamation-circle',
                                acceptClassName: 'p-button-danger',
                                acceptLabel: 'Ok',
                                rejectLabel: 'Annuler',
                                accept,
                                reject
                            });
                        }} />
                </div>
            </div>
        )
    }

    return (
        <>
            <Toast ref={toastTR} position="top-right" />
            <ConfirmDialog />

            <div className="flex flex-column justify-content-center">
                <DataTable header={header} value={listClient} responsiveLayout="scroll" className='bg-white'>
                    <Column field='code_client' header="Code"></Column>
                    <Column field='nom' header="Nom"></Column>
                    <Column field='rc' header="Phone1"></Column>
                    <Column field='stat' header="Phone2"></Column>
                    <Column field='cif' header="Mobile"></Column>
                    <Column field='nif' header="Adresse"></Column>
                    <Column header="action" body={bodyBoutton} align={'left'}></Column>
                </DataTable>
            </div>
        </>
    )
}
