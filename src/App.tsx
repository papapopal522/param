import React, { useState } from 'react';
import ParamEditor from './ParamEditor';


interface Param {
    id: number;
    name: string;
    type: 'string';
}

interface ParamValue {
    paramId: number;
    value: string;
}

interface Model {
    paramValues: ParamValue[];
}

const App: React.FC = () => {
    const initialParams: Param[] = [
        { id: 1, name: 'Назначение', type: 'string' },
        { id: 2, name: 'Длина', type: 'string' },
    ];

    const initialModel: Model = {
        paramValues: [
            { paramId: 1, value: 'повседневное' },
            { paramId: 2, value: 'макси' },
        ],
    };

    const [model, setModel] = useState<Model>(initialModel);
    const [params, setParams] = useState<Param[]>(initialParams);

    const handleUpdateModel = (updatedModel: Model) => {
        setModel(updatedModel);
    };

    const handleAddParam = (newParam: Param) => {

        setParams([...params, newParam]);
    };

    return (
        <div>
            <h1>Product Editor</h1>
            <ParamEditor params={params} model={model} onUpdateModel={handleUpdateModel} onAddParam={handleAddParam} />
            <pre>{JSON.stringify(model, null, 2)}</pre>
        </div>
    );
};

export default App;
