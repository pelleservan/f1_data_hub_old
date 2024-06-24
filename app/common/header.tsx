import React from "react";
import Link from 'next/link'
import Image from 'next/image' 

export default function Header() {
    return(
        <React.Fragment>
            <header>
                <h1><Link href="/">F1DataHub</Link></h1>
                <div id="navbar">
                    <Link href="/api">Home</Link>
                </div>
            </header>
        </React.Fragment>
    )
}