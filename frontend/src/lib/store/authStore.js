import { create } from 'zustand';
// bu persist waa middleware. and we use it for in token-ka aanku save-gareeno local storage-ka
import { persist } from 'zustand/middleware';


// it works like this
const useAuthStore = create(
    // persist wuxu qaata (set iyo get).set-ka waa marka aad state cusub sameeneesid ama value ku shubeesid, get-ka waa marka aad value ka heleesid outside of react component
    persist(
        (set, get) => ({
    //we want to manage asagidakiler
           user: null,
           token: null,
           isAuthenticated: false,

        // Set user data and token after successfully login.state-ka ayan data ku shubayna
        setAuth: (userData, token)=> set({
            user: userData,
            token,
            isAuthenticated: true
        }),

        // clear user data and token after logout
        clearAuth: ()=> set({
            user: null,
            token: null,
            isAuthenticated: false
        }),

        // Get token (for use outside of React components)
        getToken: ()=> get().token,

        }),
        // here waa zustand data-da kor inay local-storage-ka ku keediso
        {
            name: 'auth-storage',
            // qeyb ka mid ah state-ka noo xaree,inta hoose lee noo keedi
            partialize: (state)=> ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated
            })
        }

    )
)

export default useAuthStore;