/**
 * Formulaire de contact partagé (page `/contact` et section d'accueil `ContactCta`).
 *
 * Validation typée via react-hook-form + zod, messages d'erreur tirés du dict i18n
 * (`t.contactPage.*`). Le style « trait de soulignement » (`border-0 border-b`) est
 * conservé en surchargeant les classes par défaut des primitives shadcn/ui.
 *
 * Le backend n'existe pas encore : `onSubmit` se contente de logger puis affiche un
 * toast `sonner`. Le vrai appel (server function TanStack Start) s'y branchera (#4).
 */
import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/lib/i18n";

const underline =
  "h-auto w-full rounded-none border-0 border-b border-light-gray bg-transparent px-0 py-3 font-sans text-[15px] text-ink shadow-none outline-none transition-colors placeholder:text-text-muted focus:border-blue focus-visible:ring-0";

export function ContactForm({ showOrganisation = false }: { showOrganisation?: boolean }) {
  const { t } = useI18n();

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(1, t.contactPage.required),
        email: z.string().min(1, t.contactPage.required).email(t.contactPage.invalidEmail),
        organisation: z.string().optional(),
        message: z.string().min(1, t.contactPage.required),
      }),
    [t],
  );

  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", organisation: "", message: "" },
  });

  const onSubmit = async (values: FormValues) => {
    // Backend à brancher ici (#4) : remplacer par un appel de server function.
    console.log("contact", values);
    toast.success(t.contactPage.success);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-7">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">{t.contactPage.name}</FormLabel>
              <FormControl>
                <Input placeholder={t.contactPage.name} className={underline} {...field} />
              </FormControl>
              <FormMessage className="font-sans text-[12px] text-blue" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">{t.contactPage.email}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t.contactPage.email}
                  className={underline}
                  {...field}
                />
              </FormControl>
              <FormMessage className="font-sans text-[12px] text-blue" />
            </FormItem>
          )}
        />

        {showOrganisation && (
          <FormField
            control={form.control}
            name="organisation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">{t.contactPage.organisation}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t.contactPage.organisation}
                    className={underline}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="font-sans text-[12px] text-blue" />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">{t.contactPage.message}</FormLabel>
              <FormControl>
                <Textarea
                  rows={showOrganisation ? 5 : 3}
                  placeholder={t.contactPage.message}
                  className={`${underline} min-h-0 resize-none`}
                  {...field}
                />
              </FormControl>
              <FormMessage className="font-sans text-[12px] text-blue" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="h-auto rounded-none bg-ink px-7 py-4 font-sans text-[14px] font-medium text-soft-white transition-opacity hover:bg-ink hover:opacity-85"
        >
          {t.contactPage.submit}
        </Button>
      </form>
    </Form>
  );
}
