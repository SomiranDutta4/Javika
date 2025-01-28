import React from 'react';
import { Snackbar, Alert, Stack } from '@mui/material';

const VerificationPage = ({ notifications }) => {
    return (
        <Stack spacing={2}>
            hey
            {/* {notifications.map((notification) => (
                <Snackbar
                    key={notification.id}
                    open={notification.status === 'Pending'}
                    autoHideDuration={6000}
                    onClose={() => { }}
                >
                    <Alert severity="info" onClose={() => { }} sx={{ width: '100%' }}>
                        <strong>{notification.sellerName}</strong> from <strong>{notification.storeName}</strong>
                        <br />
                        Request Date: {notification.requestDate}
                    </Alert>
                </Snackbar>
            ))} */}
        </Stack>
    );
};

export default VerificationPage;
