import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  @Input() control!: AbstractControl | null
	@Input() name!: string;

	public mapFormErrors (items: FormGroup, attributes: any){
		let errors = {}
		Object.keys(items.getRawValue()).map((value : string) => {
			let error: any = items.get(value)?.errors
			let item = Object.keys(error)
			errors = {...errors, [value]: this.mapRuleToAttribute(attributes[value], item[0])}
		})
		return errors
	}

	public mapRuleToAttribute (item: any, rule: any) {
		let messages : any = {
			required: `${item} is required`,
			email: `${item} must be an Email`,
			numeric: `${item} must be a number`,
		}

		return messages[rule];
	}

	constructor() { }

	ngOnInit(): void {}

	public mapErrorsToItem (item: any, errors: any) {
		let one = Object.keys(errors)
		let rules : any = {
			required: `${item} is required`,
			email: `${item} must be an Email`,
			numeric: `${item} must be a number`,
		}
		return rules[one[0]];
	}

}
