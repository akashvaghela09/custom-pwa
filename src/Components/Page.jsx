import React, { useEffect, useState } from 'react';
import styles from "../Styles/Page.module.css";
import  { GrAdd, GrEdit, GrClose } from "react-icons/gr";
import  { FcFullTrash } from "react-icons/fc";
import axios from "axios";

const Page = () => {
    
    const [datalist, setDataList] = useState([]);
    const [addModal, setAddModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [name, setName] = useState("");
    const [age, setAge] = useState(null);
    const [grade, setGrade] = useState("");
    const [tempID, setTempID] = useState(null);
    
    const getData = () => {
        axios.get('https://testnet-api.herokuapp.com/temp')
        .then((res) => {
            console.log(res.data);
            let list  = res.data.reverse();
            setDataList([...list])
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
    const handleAddModal = (para) => {
        setAddModal(para)
    }
    
    const handleUpdateModal = (para, data) => {
        setUpdateModal(para)
        
        setName(data.name)
        setAge(data.age)
        setGrade(data.grade)
        setTempID(data.id)
    }
    
    const addData = () => {
        axios.post('https://testnet-api.herokuapp.com/temp', {
            "name": name,
            "age": age,
            "grade": grade
        })
        .then((res) => {
            console.log(res.data);
            setName("")
            setAge(null)
            setGrade("")
            getData()
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            handleAddModal(false)
        })
    }
    
    const updateData = () => {
        axios.patch(`https://testnet-api.herokuapp.com/temp/${tempID}`, {
            "name": name,
            "age": age,
            "grade": grade
        })
        .then((res) => {
            console.log(res.data);
            setName("")
            setAge(null)
            setGrade("")
            setTempID(null)
            getData()
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            handleUpdateModal(false)
        })
    }
    
    
    const deleteData = (id) => {
        axios.delete(`https://testnet-api.herokuapp.com/temp/${id}`)
        .then((res) => {
            console.log(res.data);
            getData()
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
    useEffect(() => {
        getData()
    }, []);
    return (
        <div className={styles.wrapper}>
        <GrAdd className={styles.addBtn} onClick={() => handleAddModal(true)}/>
        {
            datalist.length !== 0 && datalist.map((el) => {
                return <div key={el.id} className={styles.tableRow}>
                    <div className={styles.tableCol}><b>Name : </b> {el.name}</div>
                    <div className={styles.tableCol2}><b>Age : </b> {el.age}</div>
                    <div className={styles.tableCol2}><b>Grade : </b> {el.grade}</div>
                    <div className={styles.tableBtnDiv}> 
                        <GrEdit  className={styles.tableBtn} onClick={() => handleUpdateModal(true, el)}/>
                        <FcFullTrash className={styles.tableBtn} onClick={() => deleteData(el.id)}/>
                    </div>
                </div>
            })
        }
        {
            addModal === true && <div className={styles.modalWrapper} >
                <div className={styles.modalContent}>
                    <input value={name} onChange={(e) => setName(e.target.value)} className={styles.inputField}placeholder='name'/>
                    <input value={age} onChange={(e) => setAge(e.target.value)} className={styles.inputField}placeholder='age'/>
                    <input value={grade} onChange={(e) => setGrade(e.target.value)} className={styles.inputField}placeholder='grade'/>
                    <p className={styles.submitBtn} onClick={() => addData()}>ADD</p>
                    <GrClose className={styles.closeBtn} onClick={() => handleAddModal(false)}/>
                </div>
            </div>
        }
        
        {
            updateModal === true && <div className={styles.modalWrapper} >
                <div className={styles.modalContent}>
                    <input value={name} onChange={(e) => setName(e.target.value)} className={styles.inputField}placeholder='name'/>
                    <input value={age} onChange={(e) => setAge(e.target.value)} className={styles.inputField}placeholder='age'/>
                    <input value={grade} onChange={(e) => setGrade(e.target.value)} className={styles.inputField}placeholder='grade'/>
                    <p className={styles.submitBtn} onClick={() => updateData()}>UPDATE</p>
                    <GrClose className={styles.closeBtn} onClick={() => handleUpdateModal(false)}/>
                </div>
            </div>
        }
        </div>
    )
}

export { Page }