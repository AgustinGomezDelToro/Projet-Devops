import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

interface DoctorData {
    name: string;
    email: string;
    telephone: string;
    speciality: string;
}

function DoctorProfile() {
    const [doctorData, setDoctorData] = useState<DoctorData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { name } = router.query;

    useEffect(() => {
        if (!name) return;

        const fetchDoctorData = async () => {
            setLoading(true);
            setError(null);

            try {
                // Asegúrate de que esta ruta coincida con la configuración de tu API
                const response = await axios.get(`/api/Doctor/DoctorProfile?name=${encodeURIComponent(name as string)}`);
                setDoctorData(response.data);
            } catch (error) {
                setError('Error al cargar los datos del doctor');
                console.error(error);
            }

            setLoading(false);
        };

        fetchDoctorData();
    }, [name]);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            {doctorData && (
                <div>
                    <p>{doctorData.name}</p>
                    <p>Email: {doctorData.email}</p>
                    <p>Teléfono: {doctorData.telephone}</p>
                    <p>Especialidad: {doctorData.speciality}</p>
                </div>
            )}
        </>
    );
}

export default DoctorProfile;
