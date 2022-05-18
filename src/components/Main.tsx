import React, {useEffect, useState} from 'react';
import {Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";


export function Main() {

    const [secret, setSecret] = useState('');
    const [didFetch, setDidFetch] = useState(false);
    const [mode, setMode] = useState('');
    const [rstnum, setRstnum] = useState('');
    const [group, setGroup] = useState('');
    const [sortMode, setSortMode] = useState('');
    const [time1, setTime1] = useState('');
    const [time2, setTime2] = useState('');
    const [time3, setTime3] = useState('');
    const [callclr1, setCallclr1] = useState('');
    const [callclr2, setCallclr2] = useState('');
    const [callclr3, setCallclr3] = useState('');
    const [skipSubNum, setSkipSubNum] = useState('');
    const [defaultFontFamily, setDefaultFontFamily] = useState('');
    const [defaultFontSize, setDefaultFontSize] = useState('');
    const [largeFontFamily, setLargeFontFamily] = useState('');
    const [largeFontSize, setLargeFontSize] = useState('');
    const [blinkingColor, setBlinkingColor] = useState('');
    const [background1, setBackground1] = useState('');
    const [serial, setSerial] = useState('');
    const [address, setAddress] = useState('');
    const [IPAddr, setIPAddr] = useState('');
    const [IPmask, setIPmask] = useState('');

    const saveToServer = async () => {
        let data = {
            'mode': mode,
            'rstnum': rstnum,
            'group': group,
            'sortmode': sortMode,
            'time1': time1,
            'time2': time2,
            'time3': time3,
            'callclr1': callclr1,
            'callclr2': callclr2,
            'callclr3': callclr3,
            'skipsubnum': skipSubNum,
            'defaultfontfamily': defaultFontFamily,
            'defaultfontsize': defaultFontSize,
            'largefontfamily': largeFontFamily,
            'largefontsize': largeFontSize,
            'blinkingcolor': blinkingColor,
            'background_1': background1,
            'serial': serial,
            'address': address,
            'ip_addr': IPAddr,
            'ip_mask': IPmask
        };

        let req = await fetch('/api/save',
            {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({data: data, secret: secret})
            }
        );
        if (req.ok) {
            alert("Saved");
            return;
        }
        if (req.status == 403) {
            alert("Error : wrong secret!");
            return;
        }
        if (req.status == 500) {
            let resp = await req.json();
            alert(`Error on backend: ${resp.error}`);
            return;
        } else {
            throw('Network error');
        }
    }
    const fetchData = async () => {
        let req = await fetch('/api/read');
        if (req.ok) {
            let resp = await req.json();
            return resp;

        } else if (req.status == 500) {
            let resp = await req.json();
            alert(`Error on backend: ${resp.error}`)
            return;
        } else {
            throw('Network error');
        }

    }
    useEffect(() => {
        fetchData().then(v => {
            if (!didFetch) {
                setDidFetch(true);
            }

            if (v.success) {
                let data = v.data;
                if (data.mode != null) {
                    setMode(data.mode);
                }
                if (data.rstnum != null) {
                    setRstnum(data.rstnum);
                }
                if (data.group != null) {
                    setGroup(data.group);
                }
                if (data.sortmode != null) {
                    setSortMode(data.sortmode);
                }
                if (data.time1 != null) {
                    setTime1(data.time1);
                }
                if (data.time2 != null) {
                    setTime2(data.time2);
                }
                if (data.time3 != null) {
                    setTime3(data.time3);
                }
                if (data.callclr1 != null) {
                    setCallclr1(data.callclr1);
                }
                if (data.callclr2 != null) {
                    setCallclr2(data.callclr2);
                }

                if (data.callclr3 != null) {
                    setCallclr3(data.callclr3);
                }
                if (data.skipsubnum != null) {
                    setSkipSubNum(data.skipsubnum);
                }

                if (data.defaultfontfamily != null) {
                    setDefaultFontFamily(data.defaultfontfamily);
                }

                if (data.defaultfontsize != null) {
                    setDefaultFontSize(data.defaultfontsize);
                }
                if (data.largefontfamily != null) {
                    setLargeFontFamily(data.largefontfamily);
                }
                if (data.largefontsize != null) {
                    setLargeFontSize(data.largefontsize);
                }
                if (data.blinkingcolor != null) {
                    setBlinkingColor(data.blinkingcolor);
                }
                if (data.background_1 != null) {
                    setBackground1(data.background_1);
                }
                if (data.serial != null) {
                    setSerial(data.serial);
                }
                if (data.address != null) {
                    setAddress(data.address);
                }
                if (data.ip_addr != null) {
                    setIPAddr(data.ip_addr);
                }
                if (data.ip_mask != null) {
                    setIPmask(data.ip_mask);
                }
            } else {
                alert(`Error on backend: ${v.error}`);
            }
        }).catch(e => {
            if (!didFetch) {
                setDidFetch(true);
            }
            alert(`Error : ${e.toString()
            }`)
        });
    }, [didFetch]);

    const onReadFile = (fileData: string) => {
        let lines = fileData.split('\n');
        lines = lines.filter(function (value, index, arr) {
            return value[0] != '#' && value[0] != ';' && value[0] != '[' && value.length > 0;
        });
        let data = {
            'mode': null,
            'rstnum': null,
            'group': null,
            'sortmode': null,
            'time1': null,
            'time2': null,
            'time3': null,
            'callclr1': null,
            'callclr2': null,
            'callclr3': null,
            'skipsubnum': null,
            'defaultfontfamily': null,
            'defaultfontsize': null,
            'largefontfamily': null,
            'largefontsize': null,
            'blinkingcolor': null,
            'background_1': null,
            'serial': null,
            'address': null,
            'ip_addr': null,
            'ip_mask': null
        };
        let key: string;
        let value: string;
        for (let line of lines) {

            if (line.includes('=')) {
                key = line.split('=')[0].replace(' ', '');
                if (Object.keys(data).includes(key)) {
                    value = line.split('=')[1].split(';')[0]
                        .replace(' ', '');
                    // @ts-ignore
                    data[key] = value;
                }

            }

        }
        if (data.mode != null) {
            setMode(data.mode);
        }
        if (data.rstnum != null) {
            setRstnum(data.rstnum);
        }
        if (data.group != null) {
            setGroup(data.group);
        }
        if (data.sortmode != null) {
            setSortMode(data.sortmode);
        }
        if (data.time1 != null) {
            setTime1(data.time1);
        }
        if (data.time2 != null) {
            setTime2(data.time2);
        }
        if (data.time3 != null) {
            setTime3(data.time3);
        }
        if (data.callclr1 != null) {
            setCallclr1(data.callclr1);
        }
        if (data.callclr2 != null) {
            setCallclr2(data.callclr2);
        }

        if (data.callclr3 != null) {
            setCallclr3(data.callclr3);
        }
        if (data.skipsubnum != null) {
            setSkipSubNum(data.skipsubnum);
        }

        if (data.defaultfontfamily != null) {
            setDefaultFontFamily(data.defaultfontfamily);
        }

        if (data.defaultfontsize != null) {
            setDefaultFontSize(data.defaultfontsize);
        }
        if (data.largefontfamily != null) {
            setLargeFontFamily(data.largefontfamily);
        }
        if (data.largefontsize != null) {
            setLargeFontSize(data.largefontsize);
        }
        if (data.blinkingcolor != null) {
            setBlinkingColor(data.blinkingcolor);
        }
        if (data.background_1 != null) {
            setBackground1(data.background_1);
        }
        if (data.serial != null) {
            setSerial(data.serial);
        }
        if (data.address != null) {
            setAddress(data.address);
        }
        if (data.ip_addr != null) {
            setIPAddr(data.ip_addr);
        }
        if (data.ip_mask != null) {
            setIPmask(data.ip_mask);
        }

    };
    return (
        <>
            <div className={"main"}>
                <div className={'ram'}>
                    <div className={"cont"}>
                        <h3>mode</h3>
                        <div className={'field'}>

                            <FormControl fullWidth>

                                <Select

                                    value={mode}

                                    onChange={(e) => setMode(e.target.value)}
                                >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    <div className={"cont"}>
                        <h3>rstnum</h3>
                        <div className={'field'}>
                            <TextField
                                fullWidth

                                value={rstnum}
                                onChange={(e) => setRstnum(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={"cont"}>
                        <h3>group</h3>
                        <div className={'field'}>

                            <TextField

                                value={group}
                                fullWidth
                                onChange={(e) => setGroup(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={"cont"}>
                        <h3>sortmode</h3>
                        <div className={'field'}>

                            <FormControl fullWidth>
                                <InputLabel></InputLabel>
                                <Select

                                    value={sortMode}

                                    onChange={(e) => setSortMode(e.target.value)}
                                >
                                    <MenuItem value={0}>0</MenuItem>
                                    <MenuItem value={1}>1</MenuItem>

                                </Select>
                            </FormControl>
                        </div>
                    </div>

                </div>

                <div className={'ram'}>
                    <div className={"cont"}>
                        <h3>time1</h3>
                        <div className={'field'}>
                            <TextField
                                fullWidth


                                value={time1}
                                onChange={(e) => setTime1(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={"cont"}>
                        <h3>time2</h3>
                        <div className={'field'}>
                            <TextField
                                fullWidth


                                value={time2}
                                onChange={(e) => setTime2(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={"cont"}>
                        <h3>time3</h3>
                        <div className={'field'}>
                            <TextField
                                fullWidth


                                value={time3}
                                onChange={(e) => setTime3(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className={'ram'}>
                    <div className={"cont"}>
                        <h3>callclr1</h3>
                        <div className={'field'}>
                            <TextField
                                fullWidth


                                value={callclr1}
                                onChange={(e) => setCallclr1(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={"cont"}>
                        <h3>callclr2</h3>
                        <div className={'field'}>
                            <TextField
                                fullWidth


                                value={callclr2}
                                onChange={(e) => setCallclr2(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={"cont"}>
                        <h3>callclr3</h3>
                        <div className={'field'}>
                            <TextField
                                fullWidth


                                value={callclr3}
                                onChange={(e) => setCallclr3(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className={'ram'}>
                    <div className={"cont"}>
                        <h3>skipsubnum</h3>
                        <div className={'field'}>
                            <TextField
                                fullWidth


                                value={skipSubNum}
                                onChange={(e) => setSkipSubNum(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className={'ram'}>
                    <div className={"cont"}>
                        <h3>defaultfontfamily</h3>
                        <div className={'field'}>
                            <TextField
                                fullWidth


                                value={defaultFontFamily}
                                onChange={(e) => setDefaultFontFamily(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={"cont"}>
                        <h3>defaultfontsize</h3>
                        <div className={'field'}>
                            <TextField
                                fullWidth


                                value={defaultFontSize}
                                onChange={(e) => setDefaultFontSize(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={"cont"}>
                        <h3>largefontfamily</h3>
                        <div className={'field'}>
                            <TextField
                                fullWidth


                                value={largeFontFamily}
                                onChange={(e) => setLargeFontFamily(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={"cont"}>
                        <h3>largefontsize</h3>
                        <div className={'field'}>
                            <TextField
                                fullWidth


                                value={largeFontSize}
                                onChange={(e) => setLargeFontSize(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={"cont"}>
                        <h3>blinkingcolor</h3>
                        <div className={'field'}>
                            <TextField
                                fullWidth


                                value={blinkingColor}
                                onChange={(e) => setBlinkingColor(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={"cont"}>
                        <h3>background_1</h3>
                        <div className={'field'}>
                            <TextField
                                fullWidth


                                value={background1}
                                onChange={(e) => setBackground1(e.target.value)}
                            />
                        </div>
                    </div>
                </div>


                <div className={'ram'}>
                    <div className={"cont"}>
                        <h3>serial</h3>
                        <div className={'field'}>
                            <TextField
                                fullWidth


                                value={serial}
                                onChange={(e) => setSerial(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={"cont"}>
                        <h3>address</h3>
                        <div className={'field'}>
                            <TextField
                                fullWidth


                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={"cont"}>
                        <h3>ip_addr</h3>
                        <div className={'field'}>
                            <TextField
                                fullWidth


                                value={IPAddr}
                                onChange={(e) => setIPAddr(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={"cont"}>
                        <h3>ip_mask</h3>
                        <div className={'field'}>
                            <TextField
                                fullWidth


                                value={IPmask}
                                onChange={(e) => setIPmask(e.target.value)}
                            />
                        </div>
                    </div>


                </div>
                <div className={'ram bottom_'}>
                    <div className={"cont"}>
                        <h3>secret</h3>
                        <div className={'field'}>
                            <TextField
                                fullWidth
                                type="password"

                                value={secret}
                                onChange={(e) => setSecret(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={'but'}>
                        <input
                            accept=".ini"
                            style={{display: 'none'}}
                            id="raised-button-file"

                            type="file"
                            onChange={(event) => {
                                let files = event.target.files;
                                const reader = new FileReader();
                                reader.addEventListener('load', (event) => {
                                    // @ts-ignore
                                    onReadFile(event.target.result);
                                });
                                // @ts-ignore
                                if (files != null) {
                                    // @ts-ignore
                                    reader.readAsText(files[0]);
                                }
                            }}
                        />
                        <label htmlFor="raised-button-file">
                            <Button component="span" fullWidth variant="contained"
                            >
                                Upload from file
                            </Button>
                        </label>
                    </div>

                    <div className={'but'}>
                        <Button component="span" variant="contained" fullWidth
                                onClick={() => saveToServer().then().catch(e => alert(e.toString()))}
                        >
                            Save configuration
                        </Button>
                    </div>
                </div>

            </div>

        </>

    );
}

export default Main;