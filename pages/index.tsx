import React from 'react';
import styles from '../styles/Home.module.css';
import { Button, ButtonGroup, Flex, Box, Spacer } from "@chakra-ui/react";
import { useRouter } from 'next/router';  // Importar useRouter

export default function Home() {
    const router = useRouter();

    return (
        <div className={styles.container}>

            <main className={styles.main}>
                <h3 className={styles.title}>
                    Bienvenu à votre espace clinique !
                </h3>

                <Flex minWidth='max-content' alignItems='center' gap='2'>
                    <Box p='2'></Box>
                    <Spacer />
                    <ButtonGroup gap='2'>
                        <Button
                            colorScheme='teal'
                            onClick={() => router.push('/login')}  // Usar la función push para redirigir
                        >
                            Log in
                        </Button>
                    </ButtonGroup>
                </Flex>
            </main>

        </div>
    );
}
