"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const supportSchema = z.object({
  subject: z.string().min(3, "Subject is too short"),
  message: z.string().min(10, "Please provide a bit more detail"),
});

type SupportFormValues = z.infer<typeof supportSchema>;

type ApiEnvelope<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
};

const faqs = [
  {
    q: "How do I return rented gear?",
    a: "Drop it off at the same location it was picked up, or arrange a pickup with the provider through your rental order page. Late returns may incur additional daily charges.",
  },
  {
    q: "What happens if the gear is damaged?",
    a: "Your deposit covers minor wear. Significant damage is assessed against the deposit amount shown at checkout, and you'll be notified before any additional charge.",
  },
  {
    q: "Can I cancel a rental?",
    a: "Yes, from Rental Orders in your dashboard, up until the rental's start date. Refund timing depends on the provider's cancellation policy.",
  },
  {
    q: "How long do refunds take?",
    a: "Refunds are issued to your original payment method and typically appear within 5–7 business days.",
  },
];

async function submitSupportRequest(
  values: SupportFormValues,
): Promise<ApiEnvelope<null>> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/support`,
    {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    },
  );

  const body: ApiEnvelope<null> = await res.json();

  if (!res.ok || !body.success) {
    throw new Error(body.message || "Failed to send message");
  }

  return body;
}

export default function SupportPage() {
  const form = useForm<SupportFormValues>({
    resolver: zodResolver(supportSchema),
    defaultValues: { subject: "", message: "" },
  });

  const sendMessage = useMutation({
    mutationFn: submitSupportRequest,
    onSuccess: (body) => {
      toast.success(
        body.message || "Message sent — we'll get back to you soon",
      );
      form.reset();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Couldn't send your message. Try again.");
    },
  });

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-10">
      <div>
        <h1 className="text-2xl font-semibold">Support</h1>
        <p className="text-muted-foreground">
          Find answers below, or send us a message directly.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Frequently asked questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            {faqs.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact us</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((values) =>
                sendMessage.mutate(values),
              )}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="What's this about?" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={5}
                        placeholder="Tell us more..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={sendMessage.isPending}>
                {sendMessage.isPending ? "Sending..." : "Send message"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
