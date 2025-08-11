import Logo from '@/components/Logo'
import React from 'react'

export default function Footer() {
  return (
    <div className="container-fluid bg-dark footer">
        <div className="container">
            <div className="pb-4" style={{borderBottom: '1px solid rgba(255, 255, 255, 0.08)'}}>
                <div className="row g-4">
                    <div className="col-lg-3">
                        <Logo variant="white" />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
