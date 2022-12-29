import React, { useState, useEffect, useRef } from 'react'
import { TabView, TabPanel } from 'primereact/tabview';
import ExamenNonEff from './ExamenJour/ExamenNonEff';


export default function ExamenParPatient(props) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="tabview-demo">
      <div className="card">
        {/* <h4>Examen</h4> */}
        <TabView activeIndex={activeIndex} onTabChange={(e)=>{ setActiveIndex(e.index) }} >
          <TabPanel header="Liste des examens à éffectuées"   >
            <ExamenNonEff url={props.url}  activeIndex={activeIndex} />
          </TabPanel>
          <TabPanel header="Liste des examens éffectuéés">
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
              architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.</p>
          </TabPanel>
        </TabView>
      </div>

    </div>
  )
}
