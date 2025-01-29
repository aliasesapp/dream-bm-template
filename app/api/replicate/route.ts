import { NextResponse } from 'next/server';
import Replicate from "replicate";

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    console.log('Received POST request');

    const requestData = await req.json();
    console.log('Parsed request data:', requestData);

    const { 
      image, 
      prompt = "img of person, detailed face, morning sunrise on the beach", 
      light_source = "Left Light",
      token = "",
      task = "text-to-image",
    } = requestData;

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN || token,
    });

    console.log('Extracted prompt:', prompt);
    console.log('Extracted light_source:', light_source);
    console.log('Extracted task:', task);
    console.log('Image data length:', image ? image.length : 'No image data');

    let response;

    switch (task) {
      case "relight-image":
        if (!image) {
          return NextResponse.json({ error: 'Image is required for relight-image task' }, { status: 400 });
        }
        response = await replicate.run("zsxkib/ic-light:d41bcb10d8c159868f4cfbd7c6a2ca01484f7d39e4613419d5952c61562f1ba7", {
          input: {
            prompt,
            light_source,
            subject_image: image,
          }
        });
        break;
      case "image-to-image":
        if (!image) {
          return NextResponse.json({ error: 'Image is required for image-to-image task' }, { status: 400 });
        }
        response = await replicate.run("tencentarc/photomaker:ddfc2b08d209f9fa8c1eca692712918bd449f695dabb4a958da31802a9570fe4", {
          input: {
            prompt: `img of a person, ${prompt}`,
            num_steps: 50,
            style_name: "Digital Art",
            input_image: image,
            num_outputs: 1,
            guidance_scale: 5,
            negative_prompt: "nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry",
            style_strength_ratio: 20
          }
        });
        break;
      default:
       response = await replicate.run("black-forest-labs/flux-dev", {
        input: {
          prompt,
        }
      });
    }

    console.log('Received output from Replicate:', response);

    return NextResponse.json({ output: response });

  } catch (error) {
    console.error('Error in POST /api/replicate:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error('An unknown error occurred:', error);
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}