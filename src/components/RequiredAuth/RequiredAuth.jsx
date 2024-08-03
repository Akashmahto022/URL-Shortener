import { UrlState } from '@/Context/Context'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarLoader } from 'react-spinners'

const RequiredAuth = ({children}) => {

    const navigate = useNavigate()

    const {loading, isAuthentication} = UrlState()


    useEffect(()=>{
        if (!isAuthentication && loading === false) navigate('/auth')
    },[isAuthentication, loading])

    if (loading) return <BarLoader width={"100%"} color='#36d7b7'/>


    if (isAuthentication) return children
}

export default RequiredAuth;