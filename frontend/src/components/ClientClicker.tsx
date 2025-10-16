"use client";

import { useMutation } from "@apollo/client/react";
import ClickerButton from "@/components/ClickerButton";
import {
  CountIncrementMutation,
  CountDecrementMutation,
  CountDecrementMutationVariables,
} from "@/_generate/graphql";
import { COUNT_INCREMENT, COUNT_DECREMENT } from "@/graphql/mutations/clicker";
import { GET_COUNT } from "@/graphql/queries/clicker";

export default function ClientClicker() {
  const [increment] = useMutation<CountIncrementMutation, CountDecrementMutationVariables>(
    COUNT_INCREMENT,
    { refetchQueries: [GET_COUNT] }
  );
  const [decrement] = useMutation<CountDecrementMutation, CountDecrementMutationVariables>(
    COUNT_DECREMENT,
    { refetchQueries: [GET_COUNT] }
  );

  return (
    <div>
      <ClickerButton onClick={() => increment({ variables: { count: 1 } })}>+</ClickerButton>
      <ClickerButton onClick={() => decrement({ variables: { count: 1 } })}>-</ClickerButton>
    </div>
  );
}
