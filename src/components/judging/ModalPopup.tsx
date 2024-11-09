import { generateClient } from "aws-amplify/api";
import Image from "next/image";
import { type SubmitHandler, useForm } from "react-hook-form";

import type { Schema } from "@/amplify/data/resource";
import { Button, SelectField } from "@aws-amplify/ui-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useUser } from "../contexts/UserContext";

const exit_icon = "/svgs/judging/exit_icon.svg";

const MODAL_POPUP_SECTION_STYLES =
  "fixed inset-0 z-50 flex items-center justify-center bg-black/60";
const MODAL_POPUP_TILE_STLYES = "w-4/5 max-w-[1200px] rounded-md bg-white p-6";

interface ModalPopupProps {
  onClose: () => void;
  teamId: string;
  hackathon: Pick<
    Schema["Hackathon"]["type"],
    "id" | "scoringComponents" | "scoringSidepots"
  >;
}

const client = generateClient<Schema>();

export type ScoreObject = {
  [x: Schema["ScoreComponentType"]["type"]["id"]]: string;
};

const ModalPopup = (props: ModalPopupProps) => {
  const { onClose, teamId, hackathon } = props;
  const { currentUser } = useUser();
  const queryClient = useQueryClient();

  const { handleSubmit, setValue, watch, reset } = useForm<
    Schema["Score"]["type"]
  >({});

  const scoreOptions = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  const { data: scoreData, isFetching: isFetchingScore } = useQuery({
    queryKey: ["Score", currentUser.username, teamId],
    queryFn: async () => {
      try {
        const { data, errors } = await client.models.Score.get({
          judgeId: currentUser.username,
          teamId: teamId,
        });
        if (errors) throw Error(errors[0].message);
        reset({
          score: data ? JSON.parse(data.score as string) : {},
        });
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  const createScore = useMutation({
    mutationKey: ["Score", currentUser.username, teamId],
    mutationFn: async (input: Schema["Score"]["type"]) => {
      if (scoreData) {
        const { data, errors } = await client.models.Score.update({
          judgeId: currentUser.username,
          teamId: teamId,
          score: JSON.stringify(input.score),
        });
        if (errors) throw Error(errors[0].message);
        return data;
      } else {
        const { data, errors } = await client.models.Score.create({
          judgeId: currentUser.username,
          teamId: teamId,
          hackathonId: hackathon.id,
          score: JSON.stringify(input.score),
        });
        if (errors) throw Error(errors[0].message);
        return data;
      }
    },
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({
        queryKey: ["Score", currentUser.username, teamId],
      });
    },
  });

  const onSubmit: SubmitHandler<Schema["Score"]["type"]> = (data) => {
    createScore.mutate(data);
  };

  const scoreObject = watch("score") as ScoreObject;

  const updateScoringComponent = (id: string, score: string) => {
    console.log(id, score);
    setValue("score", { ...scoreObject, [id]: score });
  };

  return (
    !isFetchingScore && (
      <>
        <div className={MODAL_POPUP_SECTION_STYLES}>
          <div className={MODAL_POPUP_TILE_STLYES}>
            <div className="flex justify-between">
              <h1 className="text-2xl font-bold">
                {scoreData ? `Editing ${teamId}` : `Scoring ${teamId}`}
              </h1>
              <button onClick={onClose}>
                <Image
                  src={exit_icon}
                  height={20}
                  width={20}
                  alt="Exit popup icon"
                />
              </button>
            </div>
            <div className="flex flex-col">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <p className="text-2xl">Main Components:</p>
                <div className="flex">
                  {hackathon.scoringComponents.map((component) => (
                    <div
                      className="flex flex-row items-center gap-4"
                      key={component.id}
                    >
                      <SelectField
                        onChange={(e) =>
                          updateScoringComponent(component.id, e.target.value)
                        }
                        value={scoreObject?.[component.id]}
                        label={component.friendlyName}
                        options={scoreOptions}
                      />
                    </div>
                  ))}
                </div>
                <p className="text-2xl">Sidepots:</p>
                <div className="flex">
                  {hackathon.scoringSidepots.map((component) => (
                    <div
                      className="flex flex-row items-center gap-4"
                      key={component.id}
                    >
                      <SelectField
                        onChange={(e) =>
                          updateScoringComponent(component.id, e.target.value)
                        }
                        value={scoreObject?.[component.id]}
                        label={component.friendlyName}
                        options={scoreOptions}
                      />
                    </div>
                  ))}
                </div>
                <Button type="submit" value="Submit">
                  Submit Score
                </Button>
              </form>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default ModalPopup;
