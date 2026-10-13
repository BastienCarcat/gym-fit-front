/** Real responses of GET /v2/exercises/{slug}, abridged. Heatmaps: GET /v2/exercises/{slug}/heatmap */
export interface HeroExercise {
  label: string
  slug: string
  json: string
  heatmap: string
  targets: string[]
  secondary: string[]
}

export const HERO_EXERCISES: HeroExercise[] = [
  {
    "label": "Squat",
    "slug": "squat-barbell",
    "json": "{\n  \"name\": \"Squat (Barbell)\",\n  \"slug\": \"squat-barbell\",\n  \"category\": \"Strength\",\n  \"difficulty\": \"Intermediate\",\n  \"force\": \"Push\",\n  \"equipment\": \"Barbell\",\n  \"primaryGroups\": [\n    \"Quadriceps\",\n    \"Glutes\"\n  ],\n  \"secondaryGroups\": [\n    \"Adductors\"\n  ],\n  \"targetMuscles\": [\n    {\n      \"name\": \"Quadriceps femoris\",\n      \"commonName\": \"Quads\",\n      \"group\": \"Quadriceps\"\n    },\n    {\n      \"name\": \"Gluteus maximus\",\n      \"commonName\": \"Glutes\",\n      \"group\": \"Glutes\"\n    }\n  ],\n  \"secondaryMuscles\": [\n    {\n      \"name\": \"Adductor magnus\",\n      \"commonName\": \"Adductor magnus\",\n      \"group\": \"Adductors\"\n    }\n  ],\n  \"variations\": [\n    {\n      \"name\": \"Front Squat (Barbell)\"\n    },\n    {\n      \"name\": \"Box Squat (Barbell)\"\n    }\n  ],\n  \"alternatives\": [\n    {\n      \"name\": \"Air Squat\"\n    },\n    {\n      \"name\": \"Lunge\"\n    }\n  ],\n  \"easier\": [\n    {\n      \"name\": \"Air Squat\"\n    }\n  ],\n  \"harder\": [\n    {\n      \"name\": \"Overhead Squat (Barbell)\"\n    }\n  ]\n}",
    "heatmap": "/heatmaps/squat-barbell.svg",
    "targets": [
      "Quadriceps femoris",
      "Gluteus maximus"
    ],
    "secondary": [
      "Adductor magnus"
    ]
  },
  {
    "label": "Bench press",
    "slug": "bench-press-barbell",
    "json": "{\n  \"name\": \"Bench Press (Barbell)\",\n  \"slug\": \"bench-press-barbell\",\n  \"category\": \"Strength\",\n  \"difficulty\": \"Intermediate\",\n  \"force\": \"Push\",\n  \"equipment\": \"Barbell\",\n  \"primaryGroups\": [\n    \"Chest\"\n  ],\n  \"secondaryGroups\": [\n    \"Shoulders\",\n    \"Triceps\"\n  ],\n  \"targetMuscles\": [\n    {\n      \"name\": \"Pectoralis major\",\n      \"commonName\": \"Pecs\",\n      \"group\": \"Chest\"\n    }\n  ],\n  \"secondaryMuscles\": [\n    {\n      \"name\": \"Deltoid\",\n      \"commonName\": \"Delts\",\n      \"group\": \"Shoulders\"\n    },\n    {\n      \"name\": \"Triceps brachii\",\n      \"commonName\": \"Triceps\",\n      \"group\": \"Triceps\"\n    }\n  ],\n  \"variations\": [\n    {\n      \"name\": \"Incline Bench Press (Barbell)\"\n    },\n    {\n      \"name\": \"Close Grip Bench Press (Barbell)\"\n    }\n  ],\n  \"alternatives\": [\n    {\n      \"name\": \"Bench Press (Dumbbell)\"\n    },\n    {\n      \"name\": \"Chest Press (Machine)\"\n    }\n  ],\n  \"easier\": [\n    {\n      \"name\": \"Chest Press (Machine)\"\n    }\n  ],\n  \"harder\": []\n}",
    "heatmap": "/heatmaps/bench-press-barbell.svg",
    "targets": [
      "Pectoralis major"
    ],
    "secondary": [
      "Deltoid",
      "Triceps brachii"
    ]
  },
  {
    "label": "Deadlift",
    "slug": "deadlift-barbell",
    "json": "{\n  \"name\": \"Deadlift (Barbell)\",\n  \"slug\": \"deadlift-barbell\",\n  \"category\": \"Strength\",\n  \"difficulty\": \"Intermediate\",\n  \"force\": \"Pull\",\n  \"equipment\": \"Barbell\",\n  \"primaryGroups\": [\n    \"Glutes\",\n    \"Hamstrings\",\n    \"Lower back\"\n  ],\n  \"secondaryGroups\": [\n    \"Quadriceps\",\n    \"Adductors\"\n  ],\n  \"targetMuscles\": [\n    {\n      \"name\": \"Gluteus maximus\",\n      \"commonName\": \"Glutes\",\n      \"group\": \"Glutes\"\n    },\n    {\n      \"name\": \"Biceps femoris\",\n      \"commonName\": \"Outer hamstring\",\n      \"group\": \"Hamstrings\"\n    },\n    {\n      \"name\": \"Semitendinosus\",\n      \"commonName\": \"Inner hamstring\",\n      \"group\": \"Hamstrings\"\n    },\n    {\n      \"name\": \"Semimembranosus\",\n      \"commonName\": \"Inner hamstring\",\n      \"group\": \"Hamstrings\"\n    },\n    {\n      \"name\": \"Erector spinae\",\n      \"commonName\": \"Spinal erectors\",\n      \"group\": \"Lower back\"\n    }\n  ],\n  \"secondaryMuscles\": [\n    {\n      \"name\": \"Quadriceps femoris\",\n      \"commonName\": \"Quads\",\n      \"group\": \"Quadriceps\"\n    },\n    {\n      \"name\": \"Adductor magnus\",\n      \"commonName\": \"Adductor magnus\",\n      \"group\": \"Adductors\"\n    }\n  ],\n  \"variations\": [\n    {\n      \"name\": \"Sumo Deadlift (Barbell)\"\n    },\n    {\n      \"name\": \"Rack Pull (Barbell)\"\n    }\n  ],\n  \"alternatives\": [\n    {\n      \"name\": \"Romanian Deadlift (Barbell)\"\n    },\n    {\n      \"name\": \"Romanian Deadlift (Dumbbell)\"\n    }\n  ],\n  \"easier\": [\n    {\n      \"name\": \"Deadlift (Band)\"\n    }\n  ],\n  \"harder\": [\n    {\n      \"name\": \"Deadlift - Single Leg (Barbell)\"\n    }\n  ]\n}",
    "heatmap": "/heatmaps/deadlift-barbell.svg",
    "targets": [
      "Gluteus maximus",
      "Biceps femoris",
      "Semitendinosus",
      "Semimembranosus",
      "Erector spinae"
    ],
    "secondary": [
      "Quadriceps femoris",
      "Adductor magnus"
    ]
  }
]
