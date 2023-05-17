import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_URL + "/api";
axios.defaults.withCredentials = true;

export interface ChatMessageI {
  sender: string;
  message: string;
  createdAt: Date;
}

export interface ChatSessionI extends Document {
  _id?: string;
  user: string;
  mentor: string;
  messages: ChatMessageI[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface QuestionnaireResponseI extends Document {
  _id?: string;
  user?: string;
  industry: string;
  role: string;
  whyMentor: string[];
  whatMentor: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserI extends Document {
  _id?: string;
  name: string;
  email: string;
  mentor?: string;

  // Timestamps.
  createdAt?: Date;
  updatedAt?: Date;
}



const api = {
  auth: {
    me: async (): Promise<UserI> => {
      const response = await axios.get("/auth/me");
      return response.data.user;
    },

    logout: async (): Promise<void> => {
      await axios.put("/auth/logout");
    },
  },

  chat: {
    createChatSession: async (): Promise<ChatSessionI> => {
      const response = await axios.post("/chat");
      return response.data.chatSession;
    },

    addChatMessage: async (
      chatSessionId: string,
      message: string
    ): Promise<ChatMessageI> => {
      const response = await axios.put(`/chat/${chatSessionId}/message`, {
        message,
      });
      return response.data.chatSession;
    },

    getChatSession: async (chatSessionId: string): Promise<ChatSessionI> => {
      const response = await axios.get(`/chat/${chatSessionId}`);
      return response.data.chatSession;
    },
  },

  questionnaire: {
    createQuestionnaireResponse: async (
      body: {
        industry: string;
        role: string;
        whyMentor: string[];
        whatMentor: string[];
      },
    ): Promise<QuestionnaireResponseI> => {
      const response = await axios.post("/questionnaire", body);
      return response.data.questionnaireResponse;
    },

    getQuestionnaireResponse: async (): Promise<QuestionnaireResponseI> => {
      const response = await axios.get(`/questionnaire`);
      return response.data.questionnaireResponse;
    },
  },

  user: {
    updateInfo(name: string, age: number) {
      return axios.put("/user", { name, age });
    }
  }
};

export default api;



/*
router.get("/auth/me", userAuth, me);
router.put("/auth/logout", userAuth, logout);

router.post("/chat", createChatSessionRoute);
router.put("/chat/:id/message", addChatMessageRoute);
router.get("/chat/:id", getChatSessionRoute);

router.post("/questionnaire", createQuestionnaireResponseRoute);
router.get("/questionnaire/:userId", getQuestionnaireResponseRoute);
*/