import React, { FunctionComponent, useState, useEffect } from 'react'
import TextArea from '@atlaskit/textarea';
import './ComponentView.css';
import Page, { GridColumn, Grid } from '@atlaskit/page';
import Button from '@atlaskit/button';
import Popup from '@atlaskit/popup';
import RefreshIcon from '@atlaskit/icon/glyph/refresh';

const get = async (url: string) => {
    return fetch(url, {
        method: 'GET',
    })
    .then(response => {
        return response.json();
    })
}

const put = async (url: string, data: object) => {
    return fetch(url, {
        method: 'PUT',
        mode: 'cors',
        cache: "no-cache",
        headers:{
            "content_type":"application/json",
        },
        body: JSON.stringify(data),
    }).then(response => {
        return response.text();
    })
}

const del = async (url: string) => {
    return fetch(url, {
        method: 'DELETE',
    })
    .then(response => {
        return response.text();
    })
}

const ComponentView: FunctionComponent<{}> = () => {

    const [val, setVal] = useState()
    const [things, setThings] = useState<any[]>([])
    const [loadingState, setLoadingState] = useState(false)
    const Icon = <RefreshIcon label="" size="medium" />;
    let a: string[] = [];

    useEffect(() => {
        get("http://localhost:4000/readdb")
                .then(jsn => {
                    JSON.parse(jsn).forEach((e: string) => {
                        a.push(e);
                        setArray(e);
                    })
                })
    }, [])

    const setArray = (element: string) => {
        setThings(prevState => [element, ...prevState])
    }

    return (
        <Page>
            <Grid layout="fluid">
                <GridColumn medium={3}>
                    <TextArea isCompact={true} spellCheck={true} onChange={(a) => {
                        setVal(a.target.value)
                    }}/>
                </GridColumn>
            </Grid>
            <Grid>
                <GridColumn medium={2}>
                    <Button appearance={'default'} 
                            onClick={() => {
                                if(val != ""){
                                    setArray(val)
                                    put("http://localhost:4000/writedb", {data: val})
                                }
                            }}
                    >
                        Click Me!
                    </Button>
                </GridColumn>
                <GridColumn medium={2}>
                    <Button appearance={'primary'} 
                            onClick={() => {
                                del("http://localhost:4000/dropdb")
                                setThings([])
                            }}
                    >
                        Clear
                    </Button>
                </GridColumn>
            </Grid>

            <Grid>
                <GridColumn medium={4}>
                    {things.map((t) => {
                        return (
                            <Popup isOpen={true} 
                                id={t}
                                content={() => (
                                    <div />
                                )}
                                trigger={() => (
                                    <Button 
                                        onClick={() => {
                                            things.filter(x => x === x)
                                            setLoadingState(false)
                                        }}
                                    >
                                        {t}
                                    </Button>)} />
                        )})
                    }
                </GridColumn>
            </Grid>
        </Page>
        
    );
};

export default ComponentView;
