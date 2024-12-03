

export const fetchTeacherClassrooms = async (teacherUid: string) => { 
    const response = await fetch(`http://192.168.70.47:8000/api/teacher-classrooms?teacher_uid=${teacherUid}`); 
    if (!response.ok) { 
        throw new Error('Failed to fetch classrooms'); 
    }   
    return response.json(); 
};

export const fetchStudentClassrooms = async (studentUid: string) => { 
    const response = await fetch(`http://192.168.70.47:8000/api/student_classrooms?student_uid=${studentUid}`); 
    if (!response.ok) { 
        throw new Error('Failed to fetch classrooms'); 
    }   
    return response.json(); 
};



export const fetchTeacherForms = async (teacherUid: string) => { 
    const response = await fetch(`http://192.168.70.47:8000/api/teacher-forms?teacher_uid=${teacherUid}`); 
    if (!response.ok) { 
        throw new Error('Failed to fetch classrooms'); 
    }   
    return response.json(); 
};
export const fetchstudentinclassroom = async (classroom_uid: string) => { 
    const response = await fetch(`http://192.168.70.47:8000/api/classroom/students?classroom_uid=${classroom_uid}`); 
    if (!response.ok) { 
        throw new Error('Failed to fetch classrooms'); 
    }   
    return response.json(); 
};

export const fetchformdata = async (form_uid: string) => { 
    const response = await fetch(`http://192.168.70.47:8000/api/form?form_uid=${form_uid}`); 
    if (!response.ok) { 
        throw new Error('Failed to fetch form'); 
    }   
    return response.json(); 
};

export const createClassroom = async (classroomData: { 
    title: string; 
    description: string; 
    unique_code: string; 
    uid: string }) => { 
        const response = await fetch(`http://192.168.70.47:8000/api/createclassroom`, { 
            method: 'POST', headers: { 
                'Content-Type': 'application/json', 
            }, body: JSON.stringify(classroomData),
        }); 
        
        if (!response.ok) { 
            const errorData = await response.json(); 
            throw new Error(errorData.msg ?? 'Failed to create classroom'); 
        } 
        return response.json();
}


