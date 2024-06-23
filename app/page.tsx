import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image' 
 
export const metadata: Metadata = {
  title: 'F1 Data Hub',
}

import React from 'react'
 
export default function Page() {
  return(
    <React.Fragment>
        <div id='container'>
          <h1>Welcome into F1DataHub ! 👋</h1>
        </div>

    </React.Fragment>
  )
}
