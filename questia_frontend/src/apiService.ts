require('dotenv').config();
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL


export const fetchTeacherClassrooms = async (teacherUid: string) => { 
    const response = await fetch(`${BACKEND_URL}/api/teacher-classrooms?teacher_uid=${teacherUid}`); 
    if (!response.ok) { 
        throw new Error('Failed to fetch classrooms'); 
    }   
    return response.json(); 
};

export const fetchStudentClassrooms = async (studentUid: string) => { 
    const response = await fetch(`${BACKEND_URL}/api/student_classrooms?student_uid=${studentUid}`); 
    if (!response.ok) { 
        throw new Error('Failed to fetch classrooms'); 
    }   
    return response.json(); 
};



export const fetchTeacherForms = async (teacherUid: string) => { 
    const response = await fetch(`${BACKEND_URL}/api/teacher-forms?teacher_uid=${teacherUid}`); 
    if (!response.ok) { 
        throw new Error('Failed to fetch classrooms'); 
    }   
    return response.json(); 
};
export const fetchstudentinclassroom = async (classroom_uid: string) => { 

    const response = await fetch(`${BACKEND_URL}/api/classroom/students?classroom_uid=${classroom_uid}`); 
    if (!response.ok) { 
        throw new Error('Failed to fetch classrooms'); 
    }   
    return response.json(); 
};

export const fetchformdata = async (form_uid: string) => { 
 
    const response = await fetch(`${BACKEND_URL}/api/form?form_uid=${form_uid}`); 
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

        const response = await fetch(`${BACKEND_URL}/api/createclassroom`, { 
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


