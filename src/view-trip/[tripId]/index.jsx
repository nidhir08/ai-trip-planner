import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import {useEffect , useState} from 'react'
import Information from '../components/Information';
import Hotels from '../components/Hotels';
import Itinerary from '../components/Itinerary';
import Footer from '../components/Footer';

const ViewTrip = () => {
    const {tripId}= useParams();
    const[trip,setTrip] = useState();

    useEffect(() => {
        if (tripId) {
          GetTripData();
        }
      }, [tripId]);

    const GetTripData = async()=>{
        const docRef = doc(db,'Trips',tripId);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            console.log("Document:",docSnap.data());
            setTrip(docSnap.data());
        }
        else{
            toast("No such trip exists");
        }
    }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
        {/* Info section  */}
        <Information trip={trip}/>
        {/* Hotels info */}
        <Hotels trip = {trip}/>
        {/* Itinerary info */}
        <Itinerary trip = {trip}/>
        {/* Footer section  */}
        <Footer trip={trip} />
    </div>
  )
}

export default ViewTrip