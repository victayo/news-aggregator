'use client';

import React from 'react'

export default function BootstrapClient() {

    React.useEffect(() => {
        require('bootstrap/dist/js/bootstrap.bundle.min.js');
    }, [])
    return null;
}
