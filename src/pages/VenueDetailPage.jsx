import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVenueById, clearSelectedVenue } from '../redux/slices/venuesSlice';

const VenueDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedVenue, loading, error } = useSelector((state) => state.venues);

  useEffect(() => {
    if (id) {
      dispatch(fetchVenueById(id));
    }

    return () => {
      dispatch(clearSelectedVenue());
    };
  }, [dispatch, id]);

  if (loading) return <div>Loading venue details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!selectedVenue) return <div>No venue found.</div>;

  return (
    <div>
      <h1>{selectedVenue.name}</h1>
      <p>{selectedVenue.city}</p>
      <p>{selectedVenue.country}</p>
      <p>Capacity: {selectedVenue.capacity}</p>
    </div>
  );
};

export default VenueDetailPage;