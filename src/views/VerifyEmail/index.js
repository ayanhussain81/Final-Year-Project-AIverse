import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  Spinner,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
} from '@chakra-ui/react';
import axiosInstance from 'services/axiosInstance'; // Import your axios instance for API calls
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function VerificationPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [verificationError, setVerificationError] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');
  const navigate = useNavigate();
  const { tokens, seller } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }

    const verifyEmail = async () => {
      try {
        if (seller?.isEmailVerified) {
          setVerificationError(null);
          setIsLoading(false);
          return;
        }
        const response = await axiosInstance.post(
          '/seller/verify-email',
          { token },
          {
            headers: {
              Authorization: `Bearer ${tokens.access.token}`,
            },
          }
        );
        setIsLoading(false);
        if (response.data.success) {
          setVerificationError(null);
        } else {
          setVerificationError(response.data.message);
        }
      } catch (error) {
        setIsLoading(false);
        setVerificationError('An error occurred while verifying your email. Please try again.');
      } finally {
        onOpen(); // Always open the AlertDialog after verification attempt
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <Box maxW="2xl" mx="auto" mt="150px" mb="80px" p="8" borderRadius="lg" bg="white">
      {isLoading ? (
        <Stack justify="center" alignItems="center" minHeight="50vh">
          <Spinner />
          <Text>Verifying your email...</Text>
        </Stack>
      ) : verificationError ? (
        <>
          <Heading as="h2" size="lg" mb="4">
            Verification Error
          </Heading>
          <Text>{verificationError}</Text>
          <Button onClick={onClose}>Try Again</Button>
        </>
      ) : (
        <>
          <Heading as="h2" size="lg" mb="4">
            Email Verified Successfully!
          </Heading>
          <Text mb="1.5rem">Thank you for verifying your email. You can now access all features.</Text>
          {/* Add link or button to redirect to the appropriate page */}
          <Button onClick={() => navigate('/seller')}>Continue to Dashboard</Button>
        </>
      )}
      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Verification Result</AlertDialogHeader>
          <AlertDialogBody>
            {verificationError ? (
              <>
                {verificationError}
                <br />
                Please try again.
              </>
            ) : (
              'Email Verified Successfully!'
            )}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onClose}>Close</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
}

export default VerificationPage;
