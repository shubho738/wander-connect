
import axios from 'axios'

export const updateNotificationAlert = async () => {

  try {
    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/notifications`)
  }

  catch(err) {

    if (axios.isAxiosError(err)) {
      throw new Error("Failed to fetch notifications: " + err.message)
    } 
    
    else {
      throw new Error("Unexpected error while fetching notifications")
    }
  }
}


export const deleteNotifications = async () => {


  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/notifications`)
  }

  catch(err) {
    
    if (axios.isAxiosError(err)) {
      throw new Error("Failed to delete notifications: " + err.message)
    } 
    
    else {
      throw new Error("Unexpected error while deleting notifications")
    }
  }
}