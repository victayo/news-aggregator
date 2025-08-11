import React from 'react'

export default function NewsHeader() {
    return (
        <div className="d-flex flex-column flex-md-row justify-content-md-between border-bottom mb-4">
            <h1 className="mb-4">What's New</h1>
            <ul className="nav nav-pills d-inline-flex text-center">
                <li className="nav-item mb-3">
                    <a className="d-flex py-2 bg-light rounded-pill active me-2" data-bs-toggle="pill"
                        href="#tab-1">
                        <span className="text-dark" style={{ width: '100px' }}>All</span>
                    </a>
                </li>
                <li className="nav-item mb-3">
                    <a className="d-flex py-2 bg-light rounded-pill me-2" data-bs-toggle="pill"
                        href="#tab-2">
                        <span className="text-dark" style={{ width: '100px' }}>Magazine</span>
                    </a>
                </li>
                <li className="nav-item mb-3">
                    <a className="d-flex py-2 bg-light rounded-pill me-2" data-bs-toggle="pill"
                        href="#tab-3">
                        <span className="text-dark" style={{ width: '100px' }}>Politics</span>
                    </a>
                </li>
                <li className="nav-item mb-3">
                    <a className="d-flex py-2 bg-light rounded-pill me-2" data-bs-toggle="pill"
                        href="#tab-4">
                        <span className="text-dark" style={{ width: '100px' }}>Technology</span>
                    </a>
                </li>
                <li className="nav-item mb-3">
                    <a className="d-flex py-2 bg-light rounded-pill me-2" data-bs-toggle="pill"
                        href="#tab-5">
                        <span className="text-dark" style={{ width: '100px' }}>Fashion</span>
                    </a>
                </li>
            </ul>
        </div>
    )
}
