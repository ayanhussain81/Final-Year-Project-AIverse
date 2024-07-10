import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Text, Button, Textarea, FormControl, FormLabel, Select, useToast, Heading, Divider } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import axiosInstance from 'services/axiosInstance';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const ReviewForm = ({ modelId, addReview }) => {
  const toast = useToast();
  const { user: userState, tokens } = useSelector((state) => state.auth);

  const initialValues = {
    rating: 5,
    comment: '',
  };

  const validationSchema = Yup.object({
    rating: Yup.number().required('Rating is required').min(1).max(5),
    comment: Yup.string().required('Comment is required').min(10, 'Comment should be at least 10 characters long'),
  });

  const submitReview = async (values, actions) => {
    try {
      const response = await axiosInstance.post('/models/reviews', {
        modelId,
        userId: userState?.id,
        ...values,
      });
      const data = {
        ...response.data,
      };
      addReview(response.data);
      actions.resetForm();
      toast({
        title: 'Review added.',
        description: 'Your review has been added successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box bg="white" p={4} rounded="md" shadow="md">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitReview}>
        {({ isSubmitting }) => (
          <Form>
            <FormControl id="rating" mb={4}>
              <FormLabel>Rating</FormLabel>
              <Field as={Select} name="rating">
                {[1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    {value} Star{value > 1 && 's'}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="rating" component="div" style={{ color: 'red' }} />
            </FormControl>
            <FormControl id="comment" mb={4}>
              <FormLabel>Comment</FormLabel>
              <Field as={Textarea} name="comment" />
              <ErrorMessage name="comment" component="div" style={{ color: 'red' }} />
            </FormControl>
            <Button colorScheme="brand" type="submit" isLoading={isSubmitting}>
              Submit Review
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

const Reviews = ({ modelId }) => {
  const [reviews, setReviews] = useState([]);
  const { user: userState, tokens } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosInstance.get(`/models/${modelId}/reviews`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [modelId]);

  const addReview = (review) => {
    setReviews((prevReviews) => [review, ...prevReviews]);
  };

  return (
    <Box>
      <Heading as="h1" fontSize="3xl" my={'1.5rem'}>
        Reviews
      </Heading>

      <Divider borderColor="gray.400" mb={5} />
      {userState?.id && <ReviewForm modelId={modelId} addReview={addReview} />}
      {reviews.map((review) => (
        <Box key={review._id} bg="white" p={4} rounded="md" shadow="md" mt={4}>
          <Text fontWeight="bold">{review.userId.name}</Text>
          <Text>{'⭐'.repeat(review.rating)}</Text>
          <Text>{review.comment}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default Reviews;
