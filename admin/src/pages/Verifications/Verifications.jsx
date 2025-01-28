import { Box, Container, Divider, ListItem, Paper, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import VerificationPage from './VerificationPage';

const Verifications = () => {
  // Dummy pending notifications for seller verification
  const [isNotification, setNotification] = useState(false)
  const [Notif, setNotif] = useState(null)

  const pendingNotifications = [
    {
      id: 1,
      sellerName: 'John Doe',
      storeName: "John's Organic Farm",
      requestDate: '2025-01-20',
      status: 'Pending',
    },
    {
      id: 2,
      sellerName: 'Jane Smith',
      storeName: "Nature's Bounty",
      requestDate: '2025-01-22',
      status: 'Pending',
    },
    {
      id: 3,
      sellerName: 'Ali Khan',
      storeName: 'Fresh Harvest',
      requestDate: '2025-01-23',
      status: 'Pending',
    },
  ];
  const handleNot=(not)=>{
    setNotification(true)
    setNotif(not)
  }

  return (
    <>
      {isNotification &&
        <VerificationPage Notif={Notif}></VerificationPage>
      }
      {!isNotification &&
        <Container sx={{ overflowY: 'scroll' }}>
          <Typography variant='h2'>Seller Verifications</Typography>
          <Box>
            <Stack spacing={2}>
              {pendingNotifications.map((notification) => (

                <Paper onClick={handleNot} elevation={5}>
                  <ListItem key={notification.id}>
                    <Container>
                      <Typography variant='p'>Seller Name:</Typography> {notification.sellerName} <br />
                    </Container>
                    <Typography>Store Name:</Typography> {notification.storeName} <br />
                    <Typography>Request Date:</Typography> {notification.requestDate} <br />
                    <Typography>Status:</Typography> {notification.status}
                  </ListItem>
                </Paper>
              ))}
            </Stack>
          </Box>

        </Container>
      }
    </>
  );
};

export default Verifications;
