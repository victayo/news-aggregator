import React from 'react'

export default function Logo({variant}: {variant?: string}) {

    let logoClass = variant && variant === 'white' ? 'text-light' : 'text-primary';

    return (
        <>
            <a href="index.html" className="navbar-brand mt-3">
                <p className={`text-primary display-6 mb-2 fw-bold ${logoClass}`} style={{ lineHeight: 0 }}>News</p>
                <small className={`${logoClass}`} style={{ letterSpacing: '12px' }}>Aggregator</small>
            </a>
        </>
    )
}
