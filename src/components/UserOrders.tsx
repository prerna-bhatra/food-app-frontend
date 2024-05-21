import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

const UserOrders = () => {
    const { token } = useSelector((state: any) => state.auth);

    useEffect(() => {

    }, [])

    
    return (
        <div>

        </div>
    )
}

export default UserOrders
