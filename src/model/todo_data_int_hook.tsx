import { useEffect } from 'react'
import { useStoreActions } from '../store/StoreModel';

/**
 * Call this funtion in application component.
 * 
 * Afterwards the todo data is initialized.
 */
const useTodoInitDataHook = () => {
    const initData = useStoreActions(actions => actions.todoModel.initData)
    useEffect(
        () => {
            initData()
            // eslint-disable-next-line
        }, []  // Only run the effect once
    )
}

export { useTodoInitDataHook }