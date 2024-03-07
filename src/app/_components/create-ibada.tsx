"use client";
import { api } from '@/trpc/react';
import { create } from 'domain';

export const CreateIbada = () => {
    const createIbada = api.ibada.create.useMutation();
    const utils = api.useUtils();

  return (
    <div>
        {createIbada.error&& <p>Error occured: {createIbada.error.message}</p>}
        <button onClick={(e)=>{
            e.preventDefault();
            createIbada.mutate({
                ibadaType: "PRAYER",
                userId:1,
            },{
                onSuccess:()=>{
                    utils.ibada.invalidate();
                }
            })
        }}>Create Ibada</button>
    </div>
  )
}
