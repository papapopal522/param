import React, { useState, useEffect } from 'react';


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

interface Props {
    params: Param[];
    model: Model;
    onUpdateModel: (updatedModel: Model) => void;
    onAddParam: (newParam: Param) => void;
}

const ParamEditor: React.FC<Props> = ({ params, model, onUpdateModel, onAddParam }) => {
    const [editedModel, setEditedModel] = useState<Model>({ paramValues: [...model.paramValues] });
    const [newParamName, setNewParamName] = useState('');

    const handleParamChange = (paramId: number, value: string) => {
        const updatedParamValues = editedModel.paramValues.map((paramValue) =>
            paramValue.paramId === paramId ? { ...paramValue, value } : paramValue
        );

        setEditedModel({ paramValues: updatedParamValues });
    };

    const handleSave = () => {
        onUpdateModel(editedModel);
    };

    const handleAddParam = () => {
        if (newParamName.trim() === '') {
            return;
        }

        const newParam: Param = {
            id: new Date().getTime(),
            name: newParamName,
            type: 'string',
        };

        onAddParam(newParam);


        setNewParamName('');


        const updatedParamValues = [...editedModel.paramValues, { paramId: newParam.id, value: '' }];
        setEditedModel({ paramValues: updatedParamValues });
    };

    useEffect(() => {
        setEditedModel({ paramValues: [...model.paramValues] });
    }, [model]);

    return (
        <div>
            <h2>Param Editor</h2>
            {params.map((param) => (
                <div key={param.id}>
                    <label>{param.name} </label>
                    <input
                        type="text"
                        value={editedModel.paramValues.find((paramValue) => paramValue.paramId === param.id)?.value || ''}
                        onChange={(e) => handleParamChange(param.id, e.target.value)}
                    />
                </div>
            ))}

            <div>
                <input
                    type="text"
                    placeholder="Новый параметр"
                    value={newParamName}
                    onChange={(e) => setNewParamName(e.target.value)}
                />
                <button onClick={handleAddParam}>Добавить параметр</button>
            </div>

            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default ParamEditor;
